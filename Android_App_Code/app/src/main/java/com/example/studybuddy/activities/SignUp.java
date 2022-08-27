package com.example.studybuddy.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Dialog;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.example.studybuddy.R;
import com.example.studybuddy.model.BASE_URL;
import com.example.studybuddy.model.SignUpResponse;
import com.example.studybuddy.model.SignupRequest;
import com.example.studybuddy.network.APIService;
import com.google.android.material.snackbar.Snackbar;

import java.util.Date;
import java.util.HashMap;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class SignUp extends AppCompatActivity {

    private Dialog dialog;
    RelativeLayout signup_layout;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);

        dialog = new Dialog(this);
        dialog.getWindow().getAttributes().windowAnimations = R.style.animation;
    }

    public void signUp_supS(View view) {

        HashMap<String,String> data = getData();

        if (!data.isEmpty()){
            String email_str = data.get("email");
            String name_str = data.get("name");
            String password_str = data.get("password");
            String registration_number_str = data.get("registration_number");
            String major_str = data.get("major");

            SignupRequest signupRequest = new SignupRequest(name_str, email_str, registration_number_str, password_str, password_str, major_str);
            signupRequest.setEmail(email_str);
            signupRequest.setName(name_str);
            signupRequest.setPassword(password_str);
            signupRequest.setConfirm(password_str);
            signupRequest.setRegno(registration_number_str);
            signupRequest.setMajor(major_str);
            loading();
            createUser(signupRequest);
        }
    }

    private void createUser(SignupRequest signupRequest) {
        Call<SignUpResponse> signUpResponseCall = getAPIService().userSignup(signupRequest);
        signUpResponseCall.enqueue(new Callback<SignUpResponse>() {
            @Override
            public void onResponse(Call<SignUpResponse> call, Response<SignUpResponse> response) {
                if (response.isSuccessful()){
                    SignUpResponse signUpResponse = response.body();
                    if (signUpResponse.isSuccess()){
                        dialog.dismiss();
                        Intent intent = new Intent(SignUp.this, Placeholder.class);
                        intent.putExtra("key", "mail");
                        intent.putExtra("message", getString(R.string.account_creation_text));
                        SignUp.this.finish();
                        startActivity(intent);
                    }
                    else {
                        show_err_snackBar("Signup Failed");
                        dialog.dismiss();
                    }
                }
                else {
                    show_err_snackBar(response.code()+"");
                    dialog.dismiss();
                }
            }
            @Override
            public void onFailure(Call<SignUpResponse> call, Throwable t) {
                show_err_snackBar(call.toString());
                dialog.dismiss();
            }
        });
    }

    private static Retrofit getRetrofit(){

        HttpLoggingInterceptor httpLoggingInterceptor = new HttpLoggingInterceptor();
        httpLoggingInterceptor.setLevel(HttpLoggingInterceptor.Level.BODY);
        OkHttpClient okHttpClient = new OkHttpClient.Builder().addInterceptor(httpLoggingInterceptor).build();

        return new Retrofit.Builder()
                .addConverterFactory(GsonConverterFactory.create())
                .baseUrl(BASE_URL.getBaseUrl())
                .client(okHttpClient)
                .build();
    }

    public static APIService getAPIService(){
        return getRetrofit().create(APIService.class);
    }

    HashMap<String, String> getData(){
        HashMap<String, String> data = new HashMap<>();
        EditText email = findViewById(R.id.email_sup);
        EditText name = findViewById(R.id.name_sup);
        EditText password = findViewById(R.id.pass_sup);
        EditText registration_number = findViewById(R.id.regno);
        EditText major = findViewById(R.id.major);

        String email_str = email.getText().toString();
        String name_str = name.getText().toString();
        String password_str = password.getText().toString();
        String registration_number_str = registration_number.getText().toString();
        String major_str = major.getText().toString();

        if (email_str.isEmpty() || name_str.isEmpty() || password_str.isEmpty() || registration_number_str.isEmpty() ||
                major_str.isEmpty()) {
            show_err_snackBar(getString(R.string.empty_fields));
        }
        else {
            String invalidFields = matchRegex(email_str, registration_number_str).trim();
            int params = invalidFields.split(" ").length;
            if (!invalidFields.equals("")) {
                String error_text = invalidFields.replace(" ", ",").replace("-"," ");
                String verb = (params > 1) ? "are" : "is";
                show_err_snackBar( error_text + " " + verb + " invalid");
            } else {
                data.put("email", email_str);
                data.put("name", name_str);
                data.put("password", password_str);
                data.put("registration_number", registration_number_str);
                data.put("major", major_str);

            }
        }
        return data;
    }

    private String matchRegex(String email_str, String registration_number_str) {
        String fields = "";
        fields = emailValidation(email_str) ? fields : fields + "Email ";
        fields = registration_number_str.matches(getString(R.string.reg_no_regex)) ? fields : fields + "Registration-Number ";
        return fields;
    }

    public boolean emailValidation(String Email) {
        char[] ec_arr = Email.toCharArray();
        int occ = 0;
        for (char x : ec_arr) {
            if (x == '@')
                occ++;
        }
        if (occ == 1) {
            String[] e_arr = Email.split("@");
            if (e_arr[1].equalsIgnoreCase(getString(R.string.vit_domain))) {
                int year = Integer.parseInt(e_arr[0].substring(e_arr[0].length() - 4));
                if (year < (1901 + (new Date()).getYear()) && year > 1969)
                    return true;
                else
                    return false;
            } else
                return false;
        } else
            return false;
    }


    public void sin_sup(View view) {
        //Intent from SignUp to LogIn
        Intent intent = new Intent(getApplicationContext(), LogIn.class);
        startActivity(intent);
    }

    void show_err_snackBar(String err_message){
        signup_layout = findViewById(R.id.sup_layout);

        Snackbar err_snackbar = Snackbar.make(signup_layout, "", Snackbar.LENGTH_INDEFINITE);
        View custom_snackbar_view = getLayoutInflater().inflate(R.layout.err_snackbar, null);
        err_snackbar.getView().setBackgroundColor(Color.TRANSPARENT);
        Snackbar.SnackbarLayout snackbarLayout =(Snackbar.SnackbarLayout) err_snackbar.getView();
        snackbarLayout.setPadding(0,0,0,0);
        TextView errText = custom_snackbar_view.findViewById(R.id.sb_error_text);
        errText.setText(err_message);
        (custom_snackbar_view.findViewById(R.id.submit_sb)).setOnClickListener(view -> err_snackbar.dismiss());
        snackbarLayout.addView(custom_snackbar_view,0);
        err_snackbar.show();

    }

    private void loading(){
        dialog.setContentView(R.layout.loading_message_layout);
        dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        dialog.show();
    }

    private void open_success_dialog(String message){
        dialog.setContentView(R.layout.success_popup_message);
        dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        TextView textView = dialog.findViewById(R.id.message);
        textView.setText(message);
        Button button = dialog.findViewById(R.id.submit_sb);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                dialog.dismiss();
                Intent intent = new Intent(SignUp.this, WelcomeScreen.class);
                SignUp.this.finish();
                startActivity(intent);
            }
        });
        dialog.show();
    }
}
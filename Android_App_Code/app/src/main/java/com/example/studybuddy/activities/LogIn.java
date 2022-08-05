package com.example.studybuddy.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Dialog;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.example.studybuddy.R;
import com.example.studybuddy.model.BASE_URL;
import com.example.studybuddy.model.LogInResponse;
import com.example.studybuddy.model.LoginRequest;
import com.example.studybuddy.network.APIService;
import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class LogIn extends AppCompatActivity {

    private Dialog dialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_log_in);

        dialog = new Dialog(this);
        dialog.getWindow().getAttributes().windowAnimations = R.style.animation;
    }

    public void f_pass(View view) {
    }


    public void signIn_lS(View view) {
        // Extract the email and password from the UI
        EditText email = findViewById(R.id.email);
        EditText password = findViewById(R.id.password);
        String email_str = email.getText().toString();
        String password_str = password.getText().toString();

        LoginRequest loginRequest = new LoginRequest(email_str, password_str);
        loginRequest.setEmail(email_str);
        loginRequest.setPassword(password_str);

        loading();
        logInUser(loginRequest);

    }

    private void logInUser(LoginRequest loginRequest) {
        Call<LogInResponse> logInResponseCall = getAPIService().userLogin(loginRequest);
        logInResponseCall.enqueue(new Callback<LogInResponse>() {
            @Override
            public void onResponse(Call<LogInResponse> call, Response<LogInResponse> response) {
                LogInResponse lr = new LogInResponse();
                int code = response.code();
                lr.setCode(code);
                dialog.dismiss();
                if (response.isSuccessful()){
                    makeToast(code + " "+ response.body().getToken() + " Login Success");
                }
                else {
                    String message = code + " -1 " + ((code == 401) ? "Not Verified" : "User doesn't exist");
                    makeToast(message);
                }
            }

            @Override
            public void onFailure(Call<LogInResponse> call, Throwable t) {
                dialog.dismiss();
                makeToast("null");
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

    public void sup_lS(View view) {
        //Intent from LogIn to SignUp
        Intent intent = new Intent(getApplicationContext(), SignUp.class);
        startActivity(intent);
    }
    public void makeToast(String message){
        Toast.makeText(LogIn.this, message, Toast.LENGTH_LONG).show();
    }

    private void loading(){
        dialog.setContentView(R.layout.loading_message_layout);
        dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        dialog.show();
    }
}
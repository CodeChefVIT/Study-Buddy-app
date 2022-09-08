package com.example.studybuddy.activities;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.app.Dialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.example.studybuddy.R;
import com.example.studybuddy.model.Model;
import com.example.studybuddy.network.APIService;
import com.example.studybuddy.network.RetroInstance;
import com.google.android.material.snackbar.Snackbar;
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class JoinGroup extends AppCompatActivity {
    RelativeLayout re;
    private Dialog dialog;
    private static final String SHARED_PREFS = "sharedPrefs";
    private static final String DEFAULT_VAL = "-1";
    private static final String TEXT = "token";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_join_group);
        dialog = new Dialog(this);
        dialog.getWindow().getAttributes().windowAnimations = R.style.animation;

    }

    public void back(View view) {
    }

    public void sendRequest(View view) {
        EditText editText = findViewById(R.id.grpCode);
        String code = editText.getText().toString();
        if (!code.isEmpty()){
            if (validCode(code))
                makeRequest(code);
            else
                show_err_snackBar("Invalid Code");
        }
        else {

        }
    }

    private void makeRequest(String code) {
        loading();
        APIService apiService = RetroInstance.getRetrofit().create(APIService.class);
        Call<Model> call = apiService.sendRequest(getToken(), code);
        call.enqueue(new Callback<Model>() {
            @Override
            public void onResponse(Call<Model> call, Response<Model> response) {
                dialog.dismiss();
                if (response.isSuccessful()){
                    Intent intent = new Intent(JoinGroup.this, Placeholder.class);
                    intent.putExtra("key", "req");
                    intent.putExtra("message", "Request sent successfully!");
                    JoinGroup.this.finish();

                    startActivity(intent);
                }
                else {

                        show_err_snackBar("Some error occurred or you may have already requested!");
                }
            }

            @Override
            public void onFailure(Call<Model> call, Throwable t) {
                dialog.dismiss();
                show_err_snackBar(getString(R.string.error_text));
            }
        });
    }

    private boolean validCode(String code) {
        if (code.length() < 11)
            return false;
        else {
            String[] ss = code.split("-");
            if (ss.length != 3){
                return false;
            }
            else {
                int j = 0;
                for (String x : ss) {
                    if (x.length() == 3){
                        j++;
                    }
                }
                return (j == 3);
            }

        }
    }

    public void scanQR(View view) {
        IntentIntegrator intentIntegrator = new IntentIntegrator(JoinGroup.this);
        intentIntegrator.setBeepEnabled(false);
        intentIntegrator.setPrompt("For flash use volume up key");
        intentIntegrator.setOrientationLocked(true);
        intentIntegrator.setCaptureActivity(Capture.class);
        intentIntegrator.initiateScan();
    }
    private String getToken(){
        SharedPreferences sharedPreferences = getSharedPreferences(SHARED_PREFS, MODE_PRIVATE);
        return sharedPreferences.getString(TEXT, DEFAULT_VAL);
    }
    private void loading(){
        dialog.setContentView(R.layout.loading_message_layout);
        dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        dialog.show();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        IntentResult intentResult = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
        if (intentResult.getContents() != null){
            makeRequest(intentResult.getContents());
        }
    }

    void show_err_snackBar(String err_message){
        re = findViewById(R.id.relLayout);

        Snackbar err_snackbar = Snackbar.make(re, "", Snackbar.LENGTH_INDEFINITE);
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

}
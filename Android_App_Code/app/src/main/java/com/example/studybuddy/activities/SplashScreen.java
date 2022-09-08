package com.example.studybuddy.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.os.Handler;

import com.example.studybuddy.R;

// TODO: Add network check
// TODO: Send Invite to group is not working properly
// TODO: Confirm Invite to group is not functional

@SuppressLint("CustomSplashScreen")
public class SplashScreen extends AppCompatActivity {

    private static final String SHARED_PREFS = "sharedPrefs";
    private static final String DEFAULT_VAL = "-1";
    private String token;
    private static final String TEXT = "token";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash_screen);
        //Intent from SplashScreen to WelcomeScreen after 5 seconds
        new Handler().postDelayed(() -> {
            if (connectivityStatus()){
                if (loginStatus()) {
                    Intent intent = new Intent(SplashScreen.this, Dashboard.class);
                    intent.putExtra(TEXT, token);
                    startActivity(intent);
                    finish();
                }
                else {
                    Intent intent = new Intent(SplashScreen.this, WelcomeScreen.class);
                    startActivity(intent);
                    finish();
                }
            }
            else {
                Intent intent = new Intent(SplashScreen.this, Placeholder.class);
                intent.putExtra("key", "notConnected");
                intent.putExtra("message", "No internet connection");
                startActivity(intent);
                finish();
            }


        }, 3000);

    }
    boolean loginStatus(){
        SharedPreferences sharedPreferences = getSharedPreferences(SHARED_PREFS, MODE_PRIVATE);
        token = sharedPreferences.getString(TEXT, DEFAULT_VAL);
        return !token.equals(DEFAULT_VAL);
    }

    boolean connectivityStatus(){
        try {
            ConnectivityManager manager = (ConnectivityManager) getSystemService(CONNECTIVITY_SERVICE);
            NetworkInfo networkInfo = (manager != null) ? manager.getActiveNetworkInfo() : null;
            return networkInfo != null && networkInfo.isConnected();
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
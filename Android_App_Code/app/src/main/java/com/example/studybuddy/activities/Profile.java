package com.example.studybuddy.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;

import com.example.studybuddy.R;

public class Profile extends AppCompatActivity {

    private static final String SHARED_PREFS = "sharedPrefs";
    private static final String TEXT = "token";
    private static final String DEFAULT_VAL = "-1";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);
    }

    public void sign_out(View view) {
        SharedPreferences sharedPreferences = getSharedPreferences(SHARED_PREFS, MODE_PRIVATE);
        sharedPreferences.edit().putString(TEXT, DEFAULT_VAL).apply();
        Intent intent = new Intent(Profile.this, WelcomeScreen.class);
        startActivity(intent);
        finish();
    }
}
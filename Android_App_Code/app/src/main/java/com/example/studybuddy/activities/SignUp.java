package com.example.studybuddy.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import com.example.studybuddy.R;

public class SignUp extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);
    }

    public void signUp_supS(View view) {

    }

    public void sin_sup(View view) {
        //Intent from SignUp to LogIn
        Intent intent = new Intent(getApplicationContext(), LogIn.class);
        startActivity(intent);
    }
}
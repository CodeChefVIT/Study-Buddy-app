package com.example.studybuddy.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import com.airbnb.lottie.LottieAnimationView;
import com.example.studybuddy.R;

public class Placeholder extends AppCompatActivity {

    String key, message;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_success_placeholder);

        Intent intent = getIntent();
        key = intent.getStringExtra("key");
        message = intent.getStringExtra("message");
        setTextButtonAnimation();

    }

    private void setTextButtonAnimation() {
        LottieAnimationView animationView = (LottieAnimationView) findViewById(R.id.logoAnimation);
        TextView textView = findViewById(R.id.textView);
        textView.setText(message);
        if (key.equals("mail")) {
            animationView.setAnimation(R.raw.mail);
        }
        else if (key.equals("req")){
            animationView.setAnimation(R.raw.invite);
        }
        else if (key.equals("notConnected")){
            animationView.setAnimation(R.raw.nonet);
        }

        animationView.loop(true);
        animationView.playAnimation();
    }

    public void done(View view) {
        if (key.equals("mail")) {
            Intent intent = new Intent(Placeholder.this, WelcomeScreen.class);
            startActivity(intent);
            finish();
        }
        else if (key.equals("req")){
            Intent intent = new Intent(Placeholder.this, Dashboard.class);
            startActivity(intent);
            finish();
        }
        else if (key.equals("notConnected")){
            Intent a = new Intent(Intent.ACTION_MAIN);
            a.addCategory(Intent.CATEGORY_HOME);
            a.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            finish();
            startActivity(a);

        }
    }
}
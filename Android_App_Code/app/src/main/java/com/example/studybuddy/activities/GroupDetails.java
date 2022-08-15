package com.example.studybuddy.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;

import com.example.studybuddy.R;
import com.example.studybuddy.model.GroupInfo;

import java.text.MessageFormat;
import java.util.ArrayList;

public class GroupDetails extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_group_details);

        Intent intent = getIntent();
        String groupName = intent.getStringExtra("name");
        String groupDescription = intent.getStringExtra("description");
        String groupAdmin = intent.getStringExtra("admin");
        String groupSubject = intent.getStringExtra("subject");
        String inviteCode = intent.getStringExtra("inviteCode");

        String finalText = MessageFormat.format("Name: {0}\nDescription: {1}\nAdmin: {2}\nSubject: {3}\nInvite Code: {4}", groupName, groupDescription, groupAdmin, groupSubject, inviteCode);

        TextView textView = findViewById(R.id.text_heading);
        textView.setText(finalText);


    }
}
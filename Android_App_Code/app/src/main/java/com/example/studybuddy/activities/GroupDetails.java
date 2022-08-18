package com.example.studybuddy.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import com.example.studybuddy.R;
import com.example.studybuddy.model.GroupInfo;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.HashMap;

public class GroupDetails extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_group_details);

        Intent intent = getIntent();
        GroupInfo groupInfo = (GroupInfo) intent.getSerializableExtra("groupInfo");
//        TextView textView = findViewById(R.id.text_heading);
//        textView.setText(groupInfo.getName());

    }

    public void memberList(View view) {
    }
}
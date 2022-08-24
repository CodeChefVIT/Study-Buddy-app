package com.example.studybuddy.activities;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;

import com.example.studybuddy.R;
import com.example.studybuddy.adapter.MembersAdapter;
import com.example.studybuddy.model.GroupInfo;

import java.util.ArrayList;

public class ApproveRequest extends AppCompatActivity {

    RecyclerView recyclerView;
    ArrayList<String> members;
    MembersAdapter membersAdapter;
    private static final String SHARED_PREFS = "sharedPrefs";
    private static final String DEFAULT_VAL = "-1";
    private static final String TEXT = "token";
    GroupInfo groupInfo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_approve_request);

        Intent intent = getIntent();
        groupInfo = (GroupInfo) intent.getSerializableExtra("groupInfo");

        setUpRecyclerView();
    }

    private void setUpRecyclerView() {
        recyclerView = findViewById(R.id.recycler_view);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        membersAdapter = new MembersAdapter(groupInfo.getRequests(), getToken(), "R");
        recyclerView.setAdapter(membersAdapter);

    }

    private String getToken(){
        SharedPreferences sharedPreferences = getSharedPreferences(SHARED_PREFS, MODE_PRIVATE);
        return sharedPreferences.getString(TEXT, DEFAULT_VAL);
    }

    public void back(View view) {
        Intent intent = new Intent(this, GroupDetails.class);
        intent.putExtra("groupInfo", groupInfo);
        ApproveRequest.this.finish();
        startActivity(intent);
    }
    @Override
    public void onBackPressed() {
        super.onBackPressed();

        Intent intent = new Intent(this, GroupDetails.class);
        intent.putExtra("groupInfo", groupInfo);
        ApproveRequest.this.finish();
        startActivity(intent);
    }
}
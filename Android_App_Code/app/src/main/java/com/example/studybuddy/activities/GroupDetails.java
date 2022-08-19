package com.example.studybuddy.activities;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.example.studybuddy.R;
import com.example.studybuddy.adapter.ModuleAdapter;
import com.example.studybuddy.model.GroupInfo;
import com.example.studybuddy.model.Module;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class GroupDetails extends AppCompatActivity {

    RecyclerView recyclerView;
    List<Module> moduleList;
    ModuleAdapter moduleAdapter;

    @SuppressLint("SetTextI18n")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_group_details);

        Intent intent = getIntent();
        GroupInfo groupInfo = (GroupInfo) intent.getSerializableExtra("groupInfo");

        String groupNameStr = groupInfo.getName();
        TextView groupName = findViewById(R.id.group_name);
        groupName.setText(groupNameStr);

        String bio = groupInfo.getDescription();
        if (bio == null){
            LinearLayout linearLayout = findViewById(R.id.group_button_container);
            linearLayout.setVisibility(View.GONE);
        }
        else {
            TextView groupDescription = findViewById(R.id.group_description);
            groupDescription.setText(bio);
        }

        int quizCount = groupInfo.getQuizzes().size();
        TextView quizCountText = findViewById(R.id.quizzes);
        quizCountText.setText(quizCount + "");

        moduleList = groupInfo.getModules();

        recyclerView = findViewById(R.id.recycler_view);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
//        recyclerView.addItemDecoration(new DividerItemDecoration(this, DividerItemDecoration.VERTICAL));

        moduleAdapter = new ModuleAdapter(moduleList);
        recyclerView.setAdapter(moduleAdapter);

    }

    public void memberList(View view) {
    }

    public void back(View view) {
        Intent intent = new Intent(this, Dashboard.class);
        GroupDetails.this.finish();
        startActivity(intent);
    }

    public void footer(View view) {
    }
}
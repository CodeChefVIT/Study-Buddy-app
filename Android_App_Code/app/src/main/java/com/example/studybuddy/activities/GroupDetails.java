package com.example.studybuddy.activities;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.example.studybuddy.R;
import com.example.studybuddy.adapter.ModuleAdapter;
import com.example.studybuddy.model.Data;
import com.example.studybuddy.model.GroupInfo;
import com.example.studybuddy.model.Module;
import com.google.android.material.snackbar.Snackbar;

import java.util.ArrayList;
import java.util.List;

public class GroupDetails extends AppCompatActivity {

    RecyclerView recyclerView;
    List<Module> moduleList;
    ArrayList<String> members;
    ModuleAdapter moduleAdapter;
    GroupInfo groupInfo;
    ArrayList<Data> userData;
    List<Data> rUserData;
    RelativeLayout rel;
    private static final String SHARED_PREFS = "sharedPrefs";
    private static final String DEFAULT_VAL = "-1";
    private static final String TEXT = "token";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_group_details);

        Intent intent = getIntent();
        groupInfo = (GroupInfo) intent.getSerializableExtra("groupInfo");


        userData = new ArrayList<>();
        String groupNameStr = groupInfo.getName();
        TextView groupName = findViewById(R.id.group_name);
        groupName.setText(groupNameStr);

        members = groupInfo.getMembers();

        String bio = groupInfo.getDescription();
        if (bio == null){
            LinearLayout linearLayout = findViewById(R.id.group_button_container);
            linearLayout.setVisibility(View.GONE);
        }
        else {
            TextView groupDescription = findViewById(R.id.group_description);
            groupDescription.setText(bio);
        }

        moduleList = groupInfo.getModules();

        recyclerView = findViewById(R.id.recycler_view);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        moduleAdapter = new ModuleAdapter(moduleList);
        recyclerView.setAdapter(moduleAdapter);

        setRequestsVisibility(groupInfo.getIsAdmin());
        setCountTexts(groupInfo.getMembers().size(), groupInfo.getRequests().size(), groupInfo.getQuizzes().size());

    }

    @SuppressLint("SetTextI18n")
    private void setCountTexts(int members_size, int requests_size, int quizzes_size) {

        TextView members = findViewById(R.id.members_count);
        TextView requests = findViewById(R.id.requests_count);
        TextView quizzes = findViewById(R.id.quizzes_count);

        members.setText(members_size + "");
        requests.setText(requests_size + "");
        quizzes.setText(quizzes_size + "");
    }

    private void setRequestsVisibility(boolean isAdmin) {
        RelativeLayout requestsLayout = findViewById(R.id.requests);
        if (isAdmin)
            requestsLayout.setVisibility(View.VISIBLE);
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

    public void sendInvite(View view) {
        Intent intent = new Intent(this, GroupInvitation.class);
        intent.putExtra("groupInfo", groupInfo);
        GroupDetails.this.finish();
        startActivity(intent);
    }

    public void getMembers(View view) {
        Intent intent = new Intent(GroupDetails.this, Members.class);
        intent.putExtra("memberList", members);
        intent.putExtra("groupInfo", groupInfo);
        GroupDetails.this.finish();
        startActivity(intent);
    }

    public void getRequests(View view) {
        if (!(groupInfo.getRequests().size() == 0)) {
            Intent intent = new Intent(GroupDetails.this, ApproveRequest.class);
            intent.putExtra("groupInfo", groupInfo);
            GroupDetails.this.finish();
            startActivity(intent);
        }
        else {
            show_err_snackBar("Sorry no requests!");
        }

    }

    public void createQuiz(View view) {
    }

    public void quizzes(View view) {
    }


    private String getToken(){
        SharedPreferences sharedPreferences = getSharedPreferences(SHARED_PREFS, MODE_PRIVATE);
        return sharedPreferences.getString(TEXT, DEFAULT_VAL);
    }

    void show_err_snackBar(String err_message){
        rel = findViewById(R.id.parentRelative);

        Snackbar err_snackbar = Snackbar.make(rel, "", Snackbar.LENGTH_INDEFINITE);
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
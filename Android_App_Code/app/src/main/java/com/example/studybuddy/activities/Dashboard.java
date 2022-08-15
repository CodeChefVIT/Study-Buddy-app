package com.example.studybuddy.activities;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import com.example.studybuddy.R;
import com.example.studybuddy.adapter.UserGroupListAdapter;
import com.example.studybuddy.model.GroupInfo;
import com.example.studybuddy.viewModel.GroupListViewModel;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;

public class Dashboard extends AppCompatActivity implements UserGroupListAdapter.OnGroupClickListener {

    RecyclerView recyclerView;
    List<GroupInfo> groupInfoList;
    GroupListViewModel groupListViewModel;
    UserGroupListAdapter userGroupListAdapter;
    private static final String SHARED_PREFS = "sharedPrefs";
    private static final String DEFAULT_VAL = "-1";
    private static final String TEXT = "token";
    private static final String NAME = "FullName";
    private static final String DEFAULT_VAL_NAME = "-1";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);

        setName();
        recyclerView = findViewById(R.id.recycler_view);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        //  recyclerView.addItemDecoration(new DividerItemDecoration(this, DividerItemDecoration.VERTICAL));

        userGroupListAdapter = new UserGroupListAdapter(groupInfoList, this);
        recyclerView.setAdapter(userGroupListAdapter);

        String token = getToken();
        groupListViewModel = ViewModelProviders.of(this).get(GroupListViewModel.class);
        groupListViewModel.getGroupList().observe(this, new Observer<ArrayList<GroupInfo>>() {
            @Override
            public void onChanged(ArrayList<GroupInfo> groupInfo) {
                if (groupInfo != null){
                    groupInfoList = groupInfo;
                    userGroupListAdapter.updateGroupInfoList(groupInfo);

                }
            }
        });
        groupListViewModel.makeApiCall(token);
    }

    private void setName() {
        TextView textView = findViewById(R.id.name);
        textView.setText(MessageFormat.format("Hello, {0}!", getName()));
    }

    private String getToken(){
        SharedPreferences sharedPreferences = getSharedPreferences(SHARED_PREFS, MODE_PRIVATE);
        return sharedPreferences.getString(TEXT, DEFAULT_VAL);
    }
    private String getName(){
        SharedPreferences sharedPreferences = getSharedPreferences(SHARED_PREFS, MODE_PRIVATE);
        return sharedPreferences.getString(NAME, DEFAULT_VAL_NAME);
    }



    public void profile(View view) {
        Intent intent = new Intent(Dashboard.this, Profile.class);
        Dashboard.this.finish();
        startActivity(intent);
    }

    @Override
    public void onGroupClick(int position) {
        Intent intent = new Intent(Dashboard.this, GroupDetails.class);
        ArrayList<GroupInfo> groupInfo = new ArrayList<>();
        groupInfo.add(groupInfoList.get(position));
        // intent.putExtra("groupInfo", groupInfo);
        intent.putExtra("id", groupInfo.get(0).get_id());
        intent.putExtra("name", groupInfo.get(0).getName());
        intent.putExtra("description", groupInfo.get(0).getDescription());
        intent.putExtra("inviteCode", groupInfo.get(0).getInviteCode());
        intent.putExtra("admin", groupInfo.get(0).getAdmin());
        intent.putExtra("subject", groupInfo.get(0).getSubject());

        startActivity(intent);
    }
}
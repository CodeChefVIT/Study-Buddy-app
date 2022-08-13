package com.example.studybuddy.activities;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.lifecycle.ViewModelProviders;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.SharedPreferences;
import android.os.Bundle;

import com.example.studybuddy.R;
import com.example.studybuddy.adapter.UserGroupListAdapter;
import com.example.studybuddy.model.GroupInfo;
import com.example.studybuddy.viewModel.GroupListViewModel;

import java.util.ArrayList;
import java.util.List;

public class Dashboard extends AppCompatActivity {

    RecyclerView recyclerView;
    List<GroupInfo> groupInfoList;
    GroupListViewModel groupListViewModel;
    UserGroupListAdapter userGroupListAdapter;
    private static final String SHARED_PREFS = "sharedPrefs";
    private static final String DEFAULT_VAL = "-1";
    private static final String TEXT = "token";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);

        recyclerView = findViewById(R.id.recycler_view);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        //  recyclerView.addItemDecoration(new DividerItemDecoration(this, DividerItemDecoration.VERTICAL));

        userGroupListAdapter = new UserGroupListAdapter(groupInfoList);
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

    private String getToken(){
        SharedPreferences sharedPreferences = getSharedPreferences(SHARED_PREFS, MODE_PRIVATE);
        return sharedPreferences.getString(TEXT, DEFAULT_VAL);
    }

}
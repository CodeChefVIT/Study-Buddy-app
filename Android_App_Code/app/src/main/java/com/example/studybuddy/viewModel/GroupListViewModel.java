package com.example.studybuddy.viewModel;

import android.util.Log;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.example.studybuddy.model.GroupInfo;
import com.example.studybuddy.model.GroupUserResponse;
import com.example.studybuddy.network.APIService;
import com.example.studybuddy.network.RetroInstance;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class GroupListViewModel extends ViewModel {
    private MutableLiveData <ArrayList<GroupInfo>> groupList;
    public GroupListViewModel() {
        groupList = new MutableLiveData <>();
    }

    public MutableLiveData <ArrayList<GroupInfo>> getGroupList() {
        return groupList;
    }

    public void makeApiCall(String token) {
        APIService apiService = RetroInstance.getRetrofit().create(APIService.class);
        Call<GroupUserResponse> call = apiService.getUserGroups(token);
        call.enqueue(new Callback<GroupUserResponse>() {
            @Override
            public void onResponse(Call<GroupUserResponse> call, Response<GroupUserResponse> response) {
                if (response.isSuccessful()){
                    assert response.body() != null;
                    groupList.postValue(response.body().getGroups());
                }
            }

            @Override
            public void onFailure(Call<GroupUserResponse> call, Throwable t) {
                groupList.postValue(null);
                Log.d("Error : ", t.getMessage().toString());
            }
        });
    }


}

package com.example.studybuddy.network;

import com.example.studybuddy.model.LogInResponse;
import com.example.studybuddy.model.LoginRequest;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface APIService {
    @POST("/api/v1/user/login")
    Call<LogInResponse> userLogin(@Body LoginRequest loginRequest);
}

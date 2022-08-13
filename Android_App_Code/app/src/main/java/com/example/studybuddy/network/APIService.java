package com.example.studybuddy.network;

import com.example.studybuddy.model.GroupUserResponse;
import com.example.studybuddy.model.LogInResponse;
import com.example.studybuddy.model.LoginRequest;
import com.example.studybuddy.model.SignUpResponse;
import com.example.studybuddy.model.SignupRequest;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;

public interface APIService {
    @POST("/api/v1/user/login")
    Call<LogInResponse> userLogin(@Body LoginRequest loginRequest);

    @POST("/api/v1/user/signup")
    Call<SignUpResponse> userSignup(@Body SignupRequest signupRequest);

    @GET("/api/v1/groups/user")
    Call<GroupUserResponse> getUserGroups(@Header("Authorization") String authToken);
}

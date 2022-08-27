package com.example.studybuddy.network;

import com.example.studybuddy.model.GroupUserResponse;
import com.example.studybuddy.model.LogInResponse;
import com.example.studybuddy.model.LoginRequest;
import com.example.studybuddy.model.Model;
import com.example.studybuddy.model.NewGroup;
import com.example.studybuddy.model.SignUpResponse;
import com.example.studybuddy.model.SignupRequest;
import com.example.studybuddy.model.User;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface APIService {
    @POST("/api/v1/user/login")
    Call<LogInResponse> userLogin(@Body LoginRequest loginRequest);

    @POST("/api/v1/user/signup")
    Call<SignUpResponse> userSignup(@Body SignupRequest signupRequest);

    @GET("/api/v1/groups/user")
    Call<GroupUserResponse> getUserGroups(@Header("Authorization") String authToken);

    @GET("/api/v1/user")
    Call<User> getUser(@Header("Authorization") String authToken);

    @GET("/api/v1/user")
    Call<User> getUser(@Header("Authorization") String authToken, @Query("id") String userID);

    @POST("/api/v1/groups/new")
    Call<GroupUserResponse> createGroup(@Header("Authorization") String authToken, @Body NewGroup newGroup);

    @GET("/api/v1/groups/request/{id}")
    Call<Model> sendRequest(@Header("Authorization") String authToken, @Path("id") String code);

    @GET("/api/v1/groups/request/accept/{group}/{user}")
    Call<Model> acceptRequest(@Header("Authorization") String authToken, @Path("group") String group, @Path("user") String user);

    @GET("/api/v1/groups/request/reject/{group}/{user}")
    Call<Model> rejectRequest(@Header("Authorization") String authToken, @Path("group") String group, @Path("user") String user);


}

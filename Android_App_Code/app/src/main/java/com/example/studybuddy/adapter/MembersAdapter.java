package com.example.studybuddy.adapter;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.studybuddy.R;
import com.example.studybuddy.model.Data;
import com.example.studybuddy.model.User;
import com.example.studybuddy.network.APIService;
import com.example.studybuddy.network.RetroInstance;
import com.squareup.picasso.Picasso;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MembersAdapter extends RecyclerView.Adapter<MembersAdapter.myViewHolder> {

    ArrayList<String> memberList;
    String token, Activity;
    public MembersAdapter(ArrayList<String> memberList, String token, String Activity){
        this.memberList = memberList;
        this.token = token;
        this.Activity = Activity;
    }

    @NonNull
    @Override
    public myViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.layout_member, parent, false);
        return new myViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull myViewHolder holder, int position) {
        String member_id = memberList.get(position);
        APIService apiService = RetroInstance.getRetrofit().create(APIService.class);
        Call<User> call = apiService.getUser(token, member_id);
        call.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if (response.isSuccessful()){

                    Data userData = response.body().getData();

                    holder.name.setText(userData.getName());
                    holder.major.setText(userData.getMajor());


                    Picasso.get().load(userData.getAvatar()).placeholder(R.drawable.ic_profile).resize(100, 100).centerCrop().into(holder.imageView, new com.squareup.picasso.Callback() {
                        @Override
                        public void onSuccess() {

                        }

                        @Override
                        public void onError(Exception e) {
                            holder.imageView.setImageResource(R.drawable.ic_profile);
                        }
                    });

//                    if (position == getItemCount() - 1){
//                        holder.mView.setVisibility(View.GONE);
//                    }
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
            }
        });
    }

    @Override
    public int getItemCount() {
        return memberList.size();
    }

    public static class myViewHolder extends RecyclerView.ViewHolder {
        TextView name, major;
        ImageView imageView;
//        View mView;
        public myViewHolder(@NonNull View itemView) {
            super(itemView);

            name = itemView.findViewById(R.id.name);
            major = itemView.findViewById(R.id.major);
            imageView = itemView.findViewById(R.id.profile_image);
//            mView = itemView.findViewById(R.id.fView);

        }
    }
}

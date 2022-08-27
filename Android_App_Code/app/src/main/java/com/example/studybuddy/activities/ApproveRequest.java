package com.example.studybuddy.activities;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.ItemTouchHelper;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.app.Dialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.View;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.example.studybuddy.R;
import com.example.studybuddy.adapter.MembersAdapter;
import com.example.studybuddy.model.GroupInfo;
import com.example.studybuddy.model.Model;
import com.example.studybuddy.network.APIService;
import com.example.studybuddy.network.RetroInstance;
import com.google.android.material.snackbar.Snackbar;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ApproveRequest extends AppCompatActivity {
    RelativeLayout re;
    RecyclerView recyclerView;
    ArrayList<String> requests;
    private Dialog dialog;
    MembersAdapter membersAdapter;
    private static final String SHARED_PREFS = "sharedPrefs";
    private static final String DEFAULT_VAL = "-1";
    private static final String TEXT = "token";
    GroupInfo groupInfo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_approve_request);
        dialog = new Dialog(this);
        dialog.getWindow().getAttributes().windowAnimations = R.style.animation;
        Intent intent = getIntent();
        groupInfo = (GroupInfo) intent.getSerializableExtra("groupInfo");
        requests = groupInfo.getRequests();

        setUpRecyclerView();
    }

    private void setUpRecyclerView() {
        recyclerView = findViewById(R.id.recycler_view);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        membersAdapter = new MembersAdapter(requests, getToken(), "R");
        recyclerView.setAdapter(membersAdapter);

        ItemTouchHelper itemTouchHelper = new ItemTouchHelper(simpleCallback);
        itemTouchHelper.attachToRecyclerView(recyclerView);

    }

    private String getToken(){
        SharedPreferences sharedPreferences = getSharedPreferences(SHARED_PREFS, MODE_PRIVATE);
        return sharedPreferences.getString(TEXT, DEFAULT_VAL);
    }

    public void back(View view) {
        finish();
    }
    @Override
    public void onBackPressed() {
        super.onBackPressed();

        finish();
    }

    ItemTouchHelper.SimpleCallback simpleCallback = new ItemTouchHelper.SimpleCallback(0, ItemTouchHelper.LEFT | ItemTouchHelper.RIGHT) {
        @Override
        public boolean onMove(@NonNull RecyclerView recyclerView, @NonNull RecyclerView.ViewHolder viewHolder, @NonNull RecyclerView.ViewHolder target) {
            return false;
        }

        @Override
        public void onSwiped(@NonNull RecyclerView.ViewHolder viewHolder, int direction) {

            int position = viewHolder.getAdapterPosition();

            switch (direction){

                case ItemTouchHelper.LEFT:
                    request(requests.get(position), getToken(), groupInfo.get_id(), 1);
                    requests.remove(position);
                    membersAdapter.notifyItemRemoved(position);

                    break;
                case ItemTouchHelper.RIGHT:
                    request(requests.get(position), getToken(), groupInfo.get_id(), 0);
                    requests.remove(position);
                    membersAdapter.notifyItemRemoved(position);
                    break;
            }
        }
    };

    /**
     * 1 -> Accept
     * 0 -> Deny
     * */
    private void request(String s, String token, String id, int x) {
        loading();
        APIService apiService = RetroInstance.getRetrofit().create(APIService.class);
        Call<Model> call = (x == 1) ? (apiService.acceptRequest(token, id, s)) : (apiService.rejectRequest(token, id, s));
        call.enqueue(new Callback<Model>() {
            @Override
            public void onResponse(Call<Model> call, Response<Model> response) {
                dialog.dismiss();
                if (response.isSuccessful()){
                    success_snackBar("Successfully " + ((x == 1) ? "accepted" : "rejected") + " the request!");
                }
                else
                {
                    err_snackBar(getString(R.string.error_text));
                }
            }

            @Override
            public void onFailure(Call<Model> call, Throwable t) {
                dialog.dismiss();
                err_snackBar(getString(R.string.error_text));
            }
        });
    }



    private void loading(){
        dialog.setContentView(R.layout.loading_message_layout);
        dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        dialog.show();
    }

    void err_snackBar(String err_message){
        re = findViewById(R.id.relLayout);
        Snackbar err_snackbar = Snackbar.make(re, "", Snackbar.LENGTH_INDEFINITE);
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

    void success_snackBar(String success_message){
        re = findViewById(R.id.relLayout);
        Snackbar err_snackbar = Snackbar.make(re, "", Snackbar.LENGTH_LONG);
        View custom_snackbar_view = getLayoutInflater().inflate(R.layout.success_snackbar, null);
        err_snackbar.getView().setBackgroundColor(Color.TRANSPARENT);
        Snackbar.SnackbarLayout snackbarLayout =(Snackbar.SnackbarLayout) err_snackbar.getView();
        snackbarLayout.setPadding(0,0,0,0);
        TextView errText = custom_snackbar_view.findViewById(R.id.sb_error_text);

        errText.setText(success_message);
        snackbarLayout.addView(custom_snackbar_view,0);
        err_snackbar.show();

    }
}
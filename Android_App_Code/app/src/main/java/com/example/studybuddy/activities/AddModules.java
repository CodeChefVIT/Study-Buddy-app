package com.example.studybuddy.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Dialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.example.studybuddy.R;
import com.example.studybuddy.model.GroupInfo;
import com.example.studybuddy.model.GroupUserResponse;
import com.example.studybuddy.model.Modules;
import com.example.studybuddy.model.NewGroup;
import com.example.studybuddy.network.APIService;
import com.example.studybuddy.network.RetroInstance;
import com.google.android.material.snackbar.Snackbar;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AddModules extends AppCompatActivity {

    EditText moduleName, daysToComplete;
    RelativeLayout re, cG, aM;
    String grpName, courseCode, modulesStr, grpDes;
    int counter = 0, mods;
    ArrayList<Modules> modules = new ArrayList<>();
    private Dialog dialog;
    private static final String SHARED_PREFS = "sharedPrefs";
    private static final String DEFAULT_VAL = "-1";
    private static final String TEXT = "token";


    // TODO: Input of Number of Modules > given number of modules


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_modules);


        dialog = new Dialog(this);
        dialog.getWindow().getAttributes().windowAnimations = R.style.animation;

        Intent intent = getIntent();
        grpName = intent.getStringExtra("grpName");
        courseCode = intent.getStringExtra("courseCode");
        modulesStr = intent.getStringExtra("modules");
        grpDes = intent.getStringExtra("des");

        cG = findViewById(R.id.create_grp);
        aM = findViewById(R.id.add_module);

        moduleName = findViewById(R.id.moduleName);
        daysToComplete = findViewById(R.id.days);

        mods = Integer.parseInt(modulesStr);

        if (counter < mods) {
            cG.setVisibility(View.GONE);
        }
        else {
            aM.setVisibility(View.GONE);
            System.out.println("List: " + modules.toString());
        }

    }

    public void back(View view) {
        finish();
    }

    public void createGroup(View view) {
        loading();
        NewGroup newGroup = new NewGroup();
        newGroup.setName(grpName);
        newGroup.setDescription(grpDes);
        newGroup.setSubject(courseCode);
        newGroup.setModules(modules);


        APIService apiService = RetroInstance.getRetrofit().create(APIService.class);

        Call<GroupUserResponse> call = apiService.createGroup(getToken(), newGroup);
        call.enqueue(new Callback<GroupUserResponse>() {
            @Override
            public void onResponse(Call<GroupUserResponse> call, Response<GroupUserResponse> response) {
                if (response.isSuccessful()){
                    dialog.dismiss();
                    //TODO : Move user to a new screen then to dashboard


                    Intent intent = new Intent(AddModules.this, Placeholder.class);
                    intent.putExtra("key", "req");
                    intent.putExtra("message", "Request sent successfully!");
                    AddModules.this.finish();
                    startActivity(intent);
                }
                else {
                    dialog.dismiss();
                    show_err_snackBar(getString(R.string.error_text));
                }
            }

            @Override
            public void onFailure(Call<GroupUserResponse> call, Throwable t) {
                dialog.dismiss();
                show_err_snackBar("Process failed!");

            }
        });
    }

    public void addModule(View view) {
        System.out.println("Counter: " + counter);
        if (counter < mods - 1){
            subAddModule(0);
        }
        else {
            if (counter == mods - 1){
                subAddModule(-1);
                cG.setVisibility(View.VISIBLE);
            }

        }
    }

    public void subAddModule(int x){
        String mod = moduleName.getText().toString();
        String day = daysToComplete.getText().toString();


        if (!mod.isEmpty() && !day.isEmpty())
        {
            if (x == 0){
                moduleName.setText("");
                daysToComplete.setText("");
            }
            Modules e = new Modules();
            e.setName(mod);
            e.setDaysToComplete(day);
            modules.add(e);
            counter++;
        }
        else {
            show_err_snackBar(getString(R.string.empty_fields));
        }
    }

    private String getToken(){
        SharedPreferences sharedPreferences = getSharedPreferences(SHARED_PREFS, MODE_PRIVATE);
        return sharedPreferences.getString(TEXT, DEFAULT_VAL);
    }

    void show_err_snackBar(String err_message){
        re = findViewById(R.id.parentRelative);
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


    private void loading(){
        dialog.setContentView(R.layout.loading_message_layout);
        dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        dialog.show();
    }
}
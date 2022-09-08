package com.example.studybuddy.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.example.studybuddy.R;
import com.google.android.material.snackbar.Snackbar;

public class CreateGroup extends AppCompatActivity {

    EditText grpName, courseCode, modules, des;
    RelativeLayout re;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_group);

        grpName = findViewById(R.id.grpName);
        courseCode = findViewById(R.id.courseCode);
        modules = findViewById(R.id.modules);
        des = findViewById(R.id.bio);

    }

    public void back(View view) {
        Intent intent = new Intent(CreateGroup.this, Dashboard.class);
        CreateGroup.this.finish();
        startActivity(intent);
    }

    public void getModules(View view) {
        String grpNameStr = this.grpName.getText().toString();
        String courseCodeStr = this.courseCode.getText().toString();
        String modulesStr = this.modules.getText().toString();
        String bio = this.des.getText().toString();

        if (grpNameStr.isEmpty() || courseCodeStr.isEmpty() || modulesStr.isEmpty() || modulesStr.equals("0") || bio.isEmpty()) {
            show_err_snackBar(getString(R.string.empty_fields));
        }
        else {
            Intent intent = new Intent(CreateGroup.this, AddModules.class);
            intent.putExtra("grpName", grpNameStr);
            intent.putExtra("courseCode", courseCodeStr);
            intent.putExtra("modules", modulesStr);
            intent.putExtra("des", bio);
            startActivity(intent);
        }
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
}
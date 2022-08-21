package com.example.studybuddy.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.studybuddy.R;
import com.example.studybuddy.model.GroupInfo;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.journeyapps.barcodescanner.BarcodeEncoder;

public class GroupInvitation extends AppCompatActivity {

    GroupInfo groupInfo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_group_invitation);

        Intent intent = getIntent();
        groupInfo = (GroupInfo) intent.getSerializableExtra("groupInfo");

        setInviteCode(groupInfo.getInviteCode());

        generateQRCode(groupInfo.getInviteCode());

    }

    private void setInviteCode(String inviteCode) {
        TextView inviteCodeText = findViewById(R.id.invite_code);
        inviteCodeText.setText(inviteCode);
    }

    public void back(View view) {
        Intent intent = new Intent(this, GroupDetails.class);
        intent.putExtra("groupInfo", groupInfo);
        GroupInvitation.this.finish();
        startActivity(intent);
    }
    @Override
    public void onBackPressed() {
        super.onBackPressed();

        Intent intent = new Intent(this, GroupDetails.class);
        intent.putExtra("groupInfo", groupInfo);
        GroupInvitation.this.finish();
        startActivity(intent);
    }

    public void sendInvite(View view) {
        Intent intent = new Intent(this, GroupDetails.class);
        intent.setAction(Intent.ACTION_SEND);
        intent.putExtra(Intent.EXTRA_TEXT, "Join my group" + groupInfo.getName() + "in StudyBuddy!\n"
                + groupInfo.getInviteCode() + "\n\n" + getString(R.string.footer));
        intent.setType("text/plain");
        Intent shareIntent = Intent.createChooser(intent, "Share via");
        startActivity(shareIntent);
    }

    private void generateQRCode(String inviteCode) {

        MultiFormatWriter multiFormatWriter = new MultiFormatWriter();
        try {
            BitMatrix bitMatrix = multiFormatWriter.encode(inviteCode, BarcodeFormat.QR_CODE, 150, 150);
            BarcodeEncoder barcodeEncoder = new BarcodeEncoder();
            Bitmap bitmap = barcodeEncoder.createBitmap(bitMatrix);
            ImageView qrCode = findViewById(R.id.qr_code);
            qrCode.setImageBitmap(bitmap);
            InputMethodManager methodManager = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);

        } catch (WriterException e) {
            e.printStackTrace();
        }


    }
}
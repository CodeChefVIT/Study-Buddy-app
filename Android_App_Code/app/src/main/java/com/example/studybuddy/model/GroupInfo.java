package com.example.studybuddy.model;

import android.os.Parcel;
import android.os.Parcelable;

import java.io.Serializable;
import java.util.ArrayList;

public class GroupInfo implements Serializable {
    private String _id;
    private String name;
    private String description;
    private String inviteCode;
    ArrayList < String > members = new ArrayList< String >();
    ArrayList < String > requests = new ArrayList < String > ();
    private String admin;
    private String subject;
    ArrayList < Object > quizzes = new ArrayList < Object > ();
    ArrayList < Module > modules = new ArrayList < Module >();
    private String date;
    private float __v;
    private String image;
    private boolean isAdmin;
    private float membersLength;


    // Getter Methods

    public String get_id() {
        return _id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getInviteCode() {
        return inviteCode;
    }

    public String getAdmin() {
        return admin;
    }

    public String getSubject() {
        return subject;
    }

    public String getDate() {
        return date;
    }

    public float get__v() {
        return __v;
    }

    public String getImage() {
        return image;
    }

    public boolean getIsAdmin() {
        return isAdmin;
    }

    public float getMembersLength() {
        return membersLength;
    }

    // Setter Methods

    public void set_id(String _id) {
        this._id = _id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setInviteCode(String inviteCode) {
        this.inviteCode = inviteCode;
    }

    public void setAdmin(String admin) {
        this.admin = admin;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void set__v(float __v) {
        this.__v = __v;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setIsAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public void setMembersLength(float membersLength) {
        this.membersLength = membersLength;
    }

    public ArrayList<String> getMembers() {
        return members;
    }

    public void setMembers(ArrayList<String> members) {
        this.members = members;
    }

    public ArrayList<String> getRequests() {
        return requests;
    }

    public void setRequests(ArrayList<String> requests) {
        this.requests = requests;
    }

    public ArrayList<Object> getQuizzes() {
        return quizzes;
    }

    public void setQuizzes(ArrayList<Object> quizzes) {
        this.quizzes = quizzes;
    }

    public ArrayList<Module> getModules() {
        return modules;
    }

    public void setModules(ArrayList<Module> modules) {
        this.modules = modules;
    }
}
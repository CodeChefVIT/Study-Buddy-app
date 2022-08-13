package com.example.studybuddy.model;

import java.util.ArrayList;

public class GroupUserResponse {
    private boolean success;
    ArrayList < GroupInfo > groups = new ArrayList< GroupInfo >() ;

    // Getter Methods

    public boolean getSuccess() {
        return success;
    }

    // Setter Methods

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public ArrayList<GroupInfo> getGroups() {
        return groups;
    }

    public void setGroups(ArrayList<GroupInfo> groups) {
        this.groups = groups;
    }
}
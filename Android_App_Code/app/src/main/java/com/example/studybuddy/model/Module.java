package com.example.studybuddy.model;

import java.io.Serializable;
import java.util.ArrayList;

public class Module implements Serializable {
    private String name;
    private float daysToComplete;
    ArrayList < String > completedUsers = new ArrayList< String >();
    private String _id;
    private String date;


    // Getter Methods

    public String getName() {
        return name;
    }

    public float getDaysToComplete() {
        return daysToComplete;
    }

    public String get_id() {
        return _id;
    }

    public String getDate() {
        return date;
    }

    // Setter Methods

    public void setName(String name) {
        this.name = name;
    }

    public void setDaysToComplete(float daysToComplete) {
        this.daysToComplete = daysToComplete;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public ArrayList<String> getCompletedUsers() {
        return completedUsers;
    }

    public void setCompletedUsers(ArrayList<String> completedUsers) {
        this.completedUsers = completedUsers;
    }
}
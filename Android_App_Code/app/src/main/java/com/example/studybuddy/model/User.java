package com.example.studybuddy.model;

public class User {
    private boolean success;
    Data data;


    // Getter Methods

    public boolean getSuccess() {
        return success;
    }

    public Data getData() {
        return data;
    }

    // Setter Methods

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public void setData(Data dataObject) {
        this.data = dataObject;
    }
}

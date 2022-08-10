package com.example.studybuddy.model;

public class SignupRequest {
    private String name;
    private String email;
    private String regno;
    private String password;
    private String confirm;
    private String major;

    public SignupRequest(String name, String email, String regno, String password, String confirm, String major) {
        this.name = name;
        this.email = email;
        this.regno = regno;
        this.password = password;
        this.confirm = confirm;
        this.major = major;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRegno() {
        return regno;
    }

    public void setRegno(String regno) {
        this.regno = regno;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirm() {
        return confirm;
    }

    public void setConfirm(String confirm) {
        this.confirm = confirm;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }
}

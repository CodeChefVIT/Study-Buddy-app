package com.example.studybuddy.model;

import java.io.Serializable;

public class Data {
    private String _id;
    private String name;
    private String email;
    private String regno;
    private boolean isVerified;
    private String graduatingYear = null;
    private String major;
    private String bio = null;
    private String createdAt;
    private String updatedAt;
    private String avatar;

    public Data(String _id, String name, String email, String regno, boolean isVerified, String graduatingYear, String major, String bio, String createdAt, String updatedAt, String avatar) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.regno = regno;
        this.isVerified = isVerified;
        this.graduatingYear = graduatingYear;
        this.major = major;
        this.bio = bio;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.avatar = avatar;
    }
// Getter Methods

    public String get_id() {
        return _id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getRegno() {
        return regno;
    }

    public boolean getIsVerified() {
        return isVerified;
    }

    public String getGraduatingYear() {
        return graduatingYear;
    }

    public String getMajor() {
        return major;
    }

    public String getBio() {
        return bio;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public String getAvatar() {
        return avatar;
    }

    // Setter Methods

    public void set_id(String _id) {
        this._id = _id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRegno(String regno) {
        this.regno = regno;
    }

    public void setIsVerified(boolean isVerified) {
        this.isVerified = isVerified;
    }

    public void setGraduatingYear(String graduatingYear) {
        this.graduatingYear = graduatingYear;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}

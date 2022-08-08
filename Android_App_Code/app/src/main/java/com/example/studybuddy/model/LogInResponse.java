package com.example.studybuddy.model;

public class LogInResponse {
    public boolean success;
    public String message, token, error;
    public int code;

    public LogInResponse(){}
    public LogInResponse(boolean success, String message, String token, String error, int code) {
        this.success = success;
        this.message = message;
        this.token = token;
        this.error = error;
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}

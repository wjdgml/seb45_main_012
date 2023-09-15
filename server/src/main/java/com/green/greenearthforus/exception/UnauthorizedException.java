package com.green.greenearthforus.exception;


public class UnauthorizedException extends RuntimeException{


    public UnauthorizedException(String message) {
        super(message);
    }

    public String getExceptionCode() {
        // 빈 문자열로 초기화
        return "";
    }
}

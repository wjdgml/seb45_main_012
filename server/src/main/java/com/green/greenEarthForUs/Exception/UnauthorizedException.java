package com.green.greenEarthForUs.Exception;


public class UnauthorizedException extends RuntimeException{
    private String exceptionCode = ""; // 빈 문자열로 초기화


    public UnauthorizedException(String message) {
        super(message);
        this.exceptionCode = exceptionCode;
    }

    public String getExceptionCode() {
        return exceptionCode;
    }
}

#!/bin/bash

# MYSQL_PASSWORD 가져오기
MYSQL_PASSWORD=$(aws ssm get-parameter --name "/MYSQL_PASSWORD" --with-decryption --query "Parameter.Value" --output text)

# JWT_SECRET_KEY 가져오기
JWT_SECRET_KEY=$(aws ssm get-parameter --name "/JWT_SECRET_KEY" --with-decryption --query "Parameter.Value" --output text)

# .jar 파일 복사
cp /app.jar /app.jar

# 애플리케이션에서 변수 사용
java -jar /app.jar --spring.datasource.password="$MYSQL_PASSWORD" --JWT_SECRET_KEY="$JWT_SECRET_KEY"
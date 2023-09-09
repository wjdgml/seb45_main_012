# (1) base-image
FROM openjdk:11

# (2) COPY에서 사용될 경로 변수
ARG JAR_FILE=build/libs/*-SNAPSHOT.jar

# (3) jar 빌드 파일을 도커 컨테이너로 복사
COPY server/build/libs/*.jar app.jar

# (4) AWS CLI 설치 (아래 명령은 적절한 패키지 관리자에 따라 변경해야 할 수 있습니다.)
RUN apt-get update && apt-get install -y awscli

ENV AWS_DEFAULT_REGION=ap-northeast-2
# (5) 파라미터 가져오기 및 환경 변수 설정
RUN MYSQL_PASSWORD=$(aws ssm get-parameter --name "/MYSQL_PASSWORD" --with-decryption --query "Parameter.Value" --output text) && \
    JWT_SECRET_KEY=$(aws ssm get-parameter --name "/JWT_SECRET_KEY" --with-decryption --query "Parameter.Value" --output text) && \
    echo "MYSQL_PASSWORD=$MYSQL_PASSWORD" >> /etc/environment && \
    echo "JWT_SECRET_KEY=$JWT_SECRET_KEY" >> /etc/environment


# (4) jar 파일 실행
ENTRYPOINT ["java","-jar","/app.jar"]
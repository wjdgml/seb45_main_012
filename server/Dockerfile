# (1) base-image
FROM openjdk:11

# (2) COPY에서 사용될 경로 변수
ARG JAR_FILE=build/libs/*-SNAPSHOT.jar

# (3) jar 빌드 파일을 도커 컨테이너로 복사
COPY ${JAR_FILE} app.jar

COPY env_setting.sh env_setting.sh

RUN chmod +x env_setting.sh

# (4) 스크립트 파일을 실행
ENTRYPOINT ["env_setting.sh"]
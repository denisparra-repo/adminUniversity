FROM openjdk:17-jdk-slim
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app_rrhh.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app_rrhh.jar"]
package com.empresadev.rrhhapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.empresadev.rrhhapi")
public class RRHHApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(RRHHApiApplication.class, args);
    }

}

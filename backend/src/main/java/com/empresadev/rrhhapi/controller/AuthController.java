package com.empresadev.rrhhapi.controller;

import com.empresadev.rrhhapi.model.dto.AuthResponse;
import com.empresadev.rrhhapi.model.dto.LoginUserDto;
import com.empresadev.rrhhapi.model.dto.RegisterUserDto;
import com.empresadev.rrhhapi.model.dto.UserOfSystemResponse;
import com.empresadev.rrhhapi.model.vo.StandarResponse;
import com.empresadev.rrhhapi.service.auth.IAuthorizationService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {

    private final IAuthorizationService iAuthorizationService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginUserDto loginUserDto) {
        AuthResponse authResponse = iAuthorizationService.loginUser(loginUserDto);
        StandarResponse response = new StandarResponse();
        response.setStatus(authResponse.getCode());
        response.setMessage(authResponse.getMessage());
        response.setData(authResponse);
        return ResponseEntity.status(authResponse.getCode()).body(response);
    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterUserDto registerUserDto) {
        AuthResponse authResponse = iAuthorizationService.registerUser(registerUserDto);
        StandarResponse response = new StandarResponse();
        response.setStatus(authResponse.getCode());
        response.setMessage(authResponse.getMessage());
        response.setData(authResponse);
        return ResponseEntity.status(authResponse.getCode()).body(response);
    }
}

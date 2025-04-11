package com.empresadev.rrhhapi.service.auth;

import com.empresadev.rrhhapi.model.dto.AuthResponse;
import com.empresadev.rrhhapi.model.dto.LoginUserDto;
import com.empresadev.rrhhapi.model.dto.RegisterUserDto;
import com.empresadev.rrhhapi.model.dto.UserOfSystemResponse;

public interface IAuthorizationService {
    AuthResponse registerUser(RegisterUserDto registerUserDto);
    AuthResponse loginUser(LoginUserDto loginUserDto);
}

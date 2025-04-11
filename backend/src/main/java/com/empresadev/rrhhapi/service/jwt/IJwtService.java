package com.empresadev.rrhhapi.service.jwt;

import org.springframework.security.core.userdetails.UserDetails;

public interface IJwtService {
    String createToken(UserDetails userDetails);
    String getEmailFromToken(String token);
    boolean isTokenValid(String token, UserDetails userDetails);
}

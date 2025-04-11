package com.empresadev.rrhhapi.service.auth;

import com.empresadev.rrhhapi.model.dto.AuthResponse;
import com.empresadev.rrhhapi.model.dto.LoginUserDto;
import com.empresadev.rrhhapi.model.dto.RegisterUserDto;
import com.empresadev.rrhhapi.model.entity.UserOfSystem;
import com.empresadev.rrhhapi.model.repository.IUserOfSystemRepository;
import com.empresadev.rrhhapi.service.jwt.IJwtService;
import lombok.AllArgsConstructor;
import org.apache.logging.log4j.util.InternalException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthorizationService implements IAuthorizationService {

    private final IUserOfSystemRepository iUserOfSystemRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final IJwtService iJwtService;

    @Override
    public AuthResponse registerUser(RegisterUserDto registerUserDto) {
        UserDetails userDetails = iUserOfSystemRepository.findByEmail(registerUserDto.email()).orElse(null);
        if(userDetails != null)
        {
            return AuthResponse.builder()
                    .message("Usuario ya esta registrado")
                    .token(null)
                    .code(400)
                    .build();
        }
        UserOfSystem newUser = UserOfSystem
                .builder()
                .name(registerUserDto.name())
                .lastName(registerUserDto.lastName())
                .email(registerUserDto.email())
                .password(passwordEncoder.encode(registerUserDto.password()))
                .roles(registerUserDto.roles())
                .build();
        iUserOfSystemRepository.save(newUser);
        String token = iJwtService.createToken(newUser);
        return AuthResponse.builder()
                .message("Usuario registrado exitosamente")
                .token(token)
                .code(200)
                .build();
    }

    @Override
    public AuthResponse loginUser(LoginUserDto loginUserDto) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginUserDto.email(), loginUserDto.password())
            );

            UserDetails userDetails = iUserOfSystemRepository.findByEmail(loginUserDto.email()).orElseThrow(() -> new InternalException("Usuario no encontrado"));
            String token = iJwtService.createToken(userDetails);
            return AuthResponse.builder()
                    .message("Inicio de sesion exitoso")
                    .token(token)
                    .code(200)
                    .build();
        }
        catch(BadCredentialsException e)
        {
            return AuthResponse.builder()
                    .message("Correo o contraseña incorrectos")
                    .token(null)
                    .code(400)
                    .build();
        }
        catch(InternalException e)
        {
            return AuthResponse.builder()
                    .message("Hubo un error inesperado")
                    .token(null)
                    .code(404)
                    .build();
        }
   }
}

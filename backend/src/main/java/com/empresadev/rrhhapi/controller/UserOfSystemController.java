package com.empresadev.rrhhapi.controller;

import com.empresadev.rrhhapi.model.dto.AssignGradeDto;
import com.empresadev.rrhhapi.model.dto.AssignSubjectDto;
import com.empresadev.rrhhapi.model.dto.UserOfSystemResponse;
import com.empresadev.rrhhapi.model.entity.UserOfSystem;
import com.empresadev.rrhhapi.model.exception.UserOfSystemNotFoundException;
import com.empresadev.rrhhapi.model.vo.StandarResponse;
import com.empresadev.rrhhapi.model.vo.UserVo;
import com.empresadev.rrhhapi.service.UserOfSystemService;
import com.empresadev.rrhhapi.service.jwt.IJwtService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserOfSystemController {

    private final UserOfSystemService userOfSystemService;
    private final IJwtService iJwtService;

    @GetMapping()
    public ResponseEntity<?> getUsers() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userOfSystemService.findAllUsers());
    }

    @GetMapping("/{token}")
    public ResponseEntity<?> getRoles(@PathVariable String token) {
        String email = iJwtService.getEmailFromToken(token);
        Optional<UserOfSystem> userOfSystemResponse = userOfSystemService.findByEmail(email);
        if (userOfSystemResponse.isEmpty()) {
            throw new UserOfSystemNotFoundException("Usuario con email " + email + " no encontrado");
        }
        StandarResponse standarResponse = new StandarResponse();
        standarResponse.setMessage("Roles of user with email " + email);
        standarResponse.setData(userOfSystemResponse.get().getRoles());
        standarResponse.setStatus(200);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(standarResponse);
    }

    @GetMapping("/info/{token}")
    public ResponseEntity<?> getUserInfo(@PathVariable String token) {
        String email = iJwtService.getEmailFromToken(token);
        Optional<UserOfSystem> userOfSystemResponse = userOfSystemService.findByEmail(email);
        if (userOfSystemResponse.isEmpty()) {
            throw new UserOfSystemNotFoundException("Usuario con email " + email + " no encontrado");
        }
        UserOfSystemResponse userOfSystemResponseDTO = UserOfSystemResponse.builder()
                .id(userOfSystemResponse.get().getId())
                .name(userOfSystemResponse.get().getName())
                .lastName(userOfSystemResponse.get().getLastName())
                .email(userOfSystemResponse.get().getEmail())
                .roles(userOfSystemResponse.get().getRoles())
                .build();
        StandarResponse standarResponse = new StandarResponse();
        standarResponse.setMessage("Información del usuario");
        standarResponse.setData(userOfSystemResponseDTO);
        standarResponse.setStatus(200);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(standarResponse);
    }

    @DeleteMapping("/delete/{email}")
    public ResponseEntity<?> deleteUser(@PathVariable("email") String email) {
        UserOfSystem userOfSystem = userOfSystemService.removeUser(email);
        if (userOfSystem != null) {
            throw new UserOfSystemNotFoundException("Usuario con email " + email + " no encontrado");
        }
        StandarResponse standarResponse = new StandarResponse();
        standarResponse.setMessage(String.format("User %s not found", email));
        standarResponse.setStatus(404);
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(standarResponse);
    }

    @GetMapping("/page")
    public ResponseEntity<?> findEmployeesByPageNumberAndPageSize(@RequestParam("pageNumber") Integer page, @RequestParam("pageSize") Integer size) {
        Page<UserOfSystem> users = userOfSystemService.findUsersByPageNumberAndPageSize(page, size);
        Page<UserOfSystemResponse> responseUsers = users.map(userOfSystem -> UserOfSystemResponse.builder()
                .name(userOfSystem.getName())
                .lastName(userOfSystem.getLastName())
                .email(userOfSystem.getEmail())
                .roles(userOfSystem.getRoles())
                .build()
        );
        StandarResponse response = new StandarResponse();
        response.setMessage("Usuarios encontrados");
        response.setData(responseUsers);
        response.setStatus(HttpStatus.OK.value());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @PostMapping("/subject")
    public ResponseEntity<StandarResponse> assignSubjectToUser(@Valid @RequestBody AssignSubjectDto assignSubjectDto) {
        UserVo userVo = userOfSystemService.assignSubjectToUser(assignSubjectDto);
        StandarResponse response = new StandarResponse();
        response.setMessage("Materia asignada exitosamente");
        response.setData(userVo);
        response.setStatus(HttpStatus.OK.value());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @PostMapping("/grade")
    public ResponseEntity<StandarResponse> assignGradeToUser(@Valid @RequestBody AssignGradeDto assignGradeDto) {
        UserVo userVo = userOfSystemService.assignGradeToUser(assignGradeDto);
        StandarResponse response = new StandarResponse();
        response.setMessage("Nota asignada exitosamente");
        response.setData(userVo);
        response.setStatus(HttpStatus.OK.value());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<?> findEmployeesByRole(@PathVariable("role") String role) {
        List<UserVo> users = userOfSystemService.findAllByRolesContaining(role);
        StandarResponse response = new StandarResponse();
        response.setMessage("Usuarios encontrados");
        response.setData(users);
        response.setStatus(HttpStatus.OK.value());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }
}

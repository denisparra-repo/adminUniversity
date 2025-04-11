package com.empresadev.rrhhapi.model.dto;

public record RegisterUserDto(
        Long id,
        String name,
        String lastName,
        String email,
        String password,
        String roles
) {
}

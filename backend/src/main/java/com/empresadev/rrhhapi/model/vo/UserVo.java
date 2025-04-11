package com.empresadev.rrhhapi.model.vo;

public record UserVo(
        Long id,
        String name,
        String lastName,
        String email,
        String roles
) {
}

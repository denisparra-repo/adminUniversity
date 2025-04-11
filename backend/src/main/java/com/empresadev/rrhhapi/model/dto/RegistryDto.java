package com.empresadev.rrhhapi.model.dto;

public record RegistryDto(
        String type,
        String name,
        Long typeId,
        Long quantity,
        String action,
        String email
) {
}

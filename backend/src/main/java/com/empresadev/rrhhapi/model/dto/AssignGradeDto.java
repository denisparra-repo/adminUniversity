package com.empresadev.rrhhapi.model.dto;

import jakarta.validation.constraints.*;

public record AssignGradeDto(

        @NotNull(message = "La nota no puede ser nula")
        Long gradeId,

        @NotNull(message = "El usuario no puede ser nulo")
        Long userId

) {
}

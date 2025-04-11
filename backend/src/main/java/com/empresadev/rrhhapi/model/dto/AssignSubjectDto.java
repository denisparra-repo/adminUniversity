package com.empresadev.rrhhapi.model.dto;

import jakarta.validation.constraints.NotNull;

public record AssignSubjectDto(

        @NotNull(message = "La materia no puede ser nula")
        Long subjectId,

        @NotNull(message = "El usuario no puede ser nulo")
        Long userId

) {
}

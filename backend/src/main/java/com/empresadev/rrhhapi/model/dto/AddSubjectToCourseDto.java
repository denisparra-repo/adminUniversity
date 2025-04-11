package com.empresadev.rrhhapi.model.dto;

import jakarta.validation.constraints.*;

public record AddSubjectToCourseDto(

        @NotNull(message = "El curso no puede ser nulo")
        Long courseId,

        @NotNull(message = "La materia no puede ser nula")
        Long subjectId
) {
}

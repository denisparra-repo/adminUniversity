package com.empresadev.rrhhapi.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record SubjectDto(

        @NotNull(message = "El nombre no puede ser nulo")
        @NotBlank(message = "El nombre no puede estar en blanco")
        @Size(min = 5, max = 50, message = "Nombre debe tener entre 5 y 50 caracteres")
        @Pattern(regexp = "^[A-Za-z0-9]*$", message = "Nombre debe contener solo letras y números")
        String name,

        @NotNull(message = "El curso no puede ser nulo")
        Long courseId,

        @NotNull(message = "El docente no puede ser nulo")
        Long teacherId
) {
}

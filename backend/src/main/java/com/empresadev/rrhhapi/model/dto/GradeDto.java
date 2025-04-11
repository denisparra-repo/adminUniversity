package com.empresadev.rrhhapi.model.dto;

import jakarta.validation.constraints.*;


public record GradeDto(

        @NotNull(message = "La materia no puede ser nula")
        Long subjectId,

        @NotNull(message = "La nota no puede ser nula")
        Double grade,

        @NotNull(message = "Descripcion no puede ser nula")
        @NotBlank(message = "Descripcion no puede estar en blanco")
        @Size(min = 2, max = 50, message = "Descripcion debe tener entre 2 y 50 caracteres")
        @Pattern(regexp = "^[A-Za-z]*$", message = "Descripcion debe contener solo letras")
        String description,

        @NotNull(message = "El usuario no puede ser nulo")
        Long userId

) {
}

package com.empresadev.rrhhapi.model.dto;

import jakarta.validation.constraints.*;

import java.util.Date;
import java.util.List;

public record CourseDto(

        @NotNull(message = "El nombre no puede ser nulo")
        @NotBlank(message = "El nombre no puede estar en blanco")
        @Size(min = 5, max = 50, message = "Nombre debe tener entre 5 y 50 caracteres")
        @Pattern(regexp = "^[A-Za-z0-9]*$", message = "Nombre debe contener solo letras y números")
        String name

        ) {
}

package com.empresadev.rrhhapi.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserOfSystemResponse {
    private Long id;
    private String name;
    private String lastName;
    private String email;
    private String roles;
}

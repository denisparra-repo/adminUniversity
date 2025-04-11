package com.empresadev.rrhhapi.model.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StandarResponse {
    private String message;
    private Integer status;
    private Object data;
}

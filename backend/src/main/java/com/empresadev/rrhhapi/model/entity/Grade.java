package com.empresadev.rrhhapi.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "grade")
@Getter
@Setter
public class Grade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long subjectId;

    private double grade;

    private String description;

    @ManyToOne
    @JsonIgnore()
    @JoinColumn(name = "user_of_system_id")
    private UserOfSystem userOfSystem;
}

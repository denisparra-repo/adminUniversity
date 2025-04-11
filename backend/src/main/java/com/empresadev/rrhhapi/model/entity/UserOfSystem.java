package com.empresadev.rrhhapi.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.ArrayList;
import java.util.Set;

@Entity
@Table(name = "user_of_system")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserOfSystem implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String lastName;

    private String email;

    @JsonIgnore()
    private String password;

    private String roles;

    @OneToMany(mappedBy = "userOfSystem")
    @JsonIgnore()
    private Set<Subject> assignedSubjects;

    @OneToMany(mappedBy = "userOfSystem")
    @JsonIgnore()
    private Set<Grade> grades;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        String[] roles = this.roles.split(",");
        for (String role: roles) {
            authorities.add(new SimpleGrantedAuthority(role.toUpperCase()));
        }
        return authorities;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

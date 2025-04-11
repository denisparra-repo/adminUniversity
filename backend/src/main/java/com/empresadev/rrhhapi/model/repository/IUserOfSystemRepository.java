package com.empresadev.rrhhapi.model.repository;

import com.empresadev.rrhhapi.model.entity.Grade;
import com.empresadev.rrhhapi.model.entity.UserOfSystem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IUserOfSystemRepository extends JpaRepository<UserOfSystem, Long> {
    Optional<UserOfSystem> findByEmail(String email);

    List<UserOfSystem> findAllByRolesContaining(String role);

}

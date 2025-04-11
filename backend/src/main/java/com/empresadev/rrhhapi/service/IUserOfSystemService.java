package com.empresadev.rrhhapi.service;

import com.empresadev.rrhhapi.model.dto.AssignGradeDto;
import com.empresadev.rrhhapi.model.dto.AssignSubjectDto;
import com.empresadev.rrhhapi.model.entity.UserOfSystem;
import com.empresadev.rrhhapi.model.vo.UserVo;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface IUserOfSystemService {
    Optional<UserOfSystem> findByEmail(String email);

    List<UserVo> findAllUsers();

    Page<UserOfSystem> findUsersByPageNumberAndPageSize(int page, int size);

    UserOfSystem removeUser(String email);

    UserVo assignSubjectToUser(AssignSubjectDto assignSubjectDto);

    UserVo assignGradeToUser(AssignGradeDto assignGradeDto);

    List<UserVo> findAllByRolesContaining(String role);
}

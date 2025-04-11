package com.empresadev.rrhhapi.service;

import com.empresadev.rrhhapi.model.dto.AssignGradeDto;
import com.empresadev.rrhhapi.model.dto.AssignSubjectDto;
import com.empresadev.rrhhapi.model.entity.Grade;
import com.empresadev.rrhhapi.model.entity.Subject;
import com.empresadev.rrhhapi.model.entity.UserOfSystem;
import com.empresadev.rrhhapi.model.repository.IGradeRepository;
import com.empresadev.rrhhapi.model.repository.ISubjectRepository;
import com.empresadev.rrhhapi.model.repository.IUserOfSystemRepository;
import com.empresadev.rrhhapi.model.vo.UserVo;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserOfSystemService implements IUserOfSystemService {

    private final IUserOfSystemRepository iUserOfSystemRepository;
    private final ISubjectRepository iSubjectRepository;
    private final IGradeRepository iGradeRepository;

    @Override
    public Optional<UserOfSystem> findByEmail(String email) {
        return iUserOfSystemRepository.findByEmail(email);
    }

    @Override
    public List<UserVo> findAllUsers() {
        List<UserOfSystem> users = iUserOfSystemRepository.findAll();
        return users.stream().map(userOfSystem -> new UserVo(
                userOfSystem.getId(),
                userOfSystem.getName(),
                userOfSystem.getLastName(),
                userOfSystem.getEmail(),
                userOfSystem.getRoles()
        )).toList();
    }

    @Override
    public Page<UserOfSystem> findUsersByPageNumberAndPageSize(int page, int size) {
        return iUserOfSystemRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public UserOfSystem removeUser(String email) {
        Optional<UserOfSystem> userOfSystem = iUserOfSystemRepository.findByEmail(email);
        if (userOfSystem.isPresent()) {
            UserOfSystem user = userOfSystem.get();
            iUserOfSystemRepository.delete(user);
            return user;
        }
        return null;
    }

    @Override
    public UserVo assignSubjectToUser(AssignSubjectDto assignSubjectDto) {
        Optional<UserOfSystem> user = iUserOfSystemRepository.findById(assignSubjectDto.userId());
        Optional<Subject> subject = iSubjectRepository.findById(assignSubjectDto.subjectId());
        UserOfSystem userOfSystem = user.get();
        userOfSystem.getAssignedSubjects().add(subject.get());
        iUserOfSystemRepository.save(userOfSystem);
        return new UserVo(userOfSystem.getId(), userOfSystem.getName(), userOfSystem.getLastName(), userOfSystem.getEmail(), userOfSystem.getRoles());
    }

    @Override
    public UserVo assignGradeToUser(AssignGradeDto assignGradeDto) {
        Optional<UserOfSystem> user = iUserOfSystemRepository.findById(assignGradeDto.userId());
        Optional<Grade> grade = iGradeRepository.findById(assignGradeDto.gradeId());
        UserOfSystem userOfSystem = user.get();
        userOfSystem.getGrades().add(grade.get());
        iUserOfSystemRepository.save(userOfSystem);
        return new UserVo(userOfSystem.getId(), userOfSystem.getName(), userOfSystem.getLastName(), userOfSystem.getEmail(), userOfSystem.getRoles());
    }

    @Override
    public List<UserVo> findAllByRolesContaining(String role) {
        List<UserOfSystem> users = iUserOfSystemRepository.findAllByRolesContaining(role);
        return users.stream().map(userOfSystem -> new UserVo(
                userOfSystem.getId(),
                userOfSystem.getName(),
                userOfSystem.getLastName(),
                userOfSystem.getEmail(),
                userOfSystem.getRoles()
        )).toList();
    }
}

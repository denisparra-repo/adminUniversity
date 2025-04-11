package com.empresadev.rrhhapi.service;

import com.empresadev.rrhhapi.model.dto.AssignGradeDto;
import com.empresadev.rrhhapi.model.dto.GradeDto;
import com.empresadev.rrhhapi.model.entity.Grade;
import com.empresadev.rrhhapi.model.entity.UserOfSystem;
import com.empresadev.rrhhapi.model.exception.CourseNotFoundException;
import com.empresadev.rrhhapi.model.exception.GradeNotFoundException;
import com.empresadev.rrhhapi.model.exception.UserOfSystemNotFoundException;
import com.empresadev.rrhhapi.model.repository.IGradeRepository;
import com.empresadev.rrhhapi.model.repository.IUserOfSystemRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GradeService implements IGradeService {

    private final IGradeRepository gradeRepository;
    private final IUserOfSystemRepository userOfSystemRepository;

    public GradeService(IGradeRepository gradeRepository, IUserOfSystemRepository userOfSystemRepository) {
        this.gradeRepository = gradeRepository;
        this.userOfSystemRepository = userOfSystemRepository;
    }

    @Override
    public Optional<Grade> findById(Long id) {
        return this.gradeRepository.findById(id);
    }

    @Override
    public Page<Grade> findGradesByPageNumberAndPageSize(int page, int size) {
        return this.gradeRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public Grade save(GradeDto grade) {
        Optional<UserOfSystem> userOfSystemOptional = this.userOfSystemRepository.findById(grade.userId());
        if (userOfSystemOptional.isEmpty()) {
            throw new UserOfSystemNotFoundException("Usuario no encontrado");
        }
        Grade newGrade = new Grade();
        newGrade.setSubjectId(grade.subjectId());
        newGrade.setGrade(grade.grade());
        newGrade.setDescription(grade.description());
        newGrade.setUserOfSystem(userOfSystemOptional.get());
        return this.gradeRepository.save(newGrade);
    }

    @Override
    public Grade update(Long id, GradeDto grade) {
        Optional<Grade> gradeOptional = this.gradeRepository.findById(id);
        if (gradeOptional.isPresent()) {
            Grade gradeToUpdate = gradeOptional.get();
            gradeToUpdate.setSubjectId(grade.subjectId());
            gradeToUpdate.setGrade(grade.grade());
            gradeToUpdate.setDescription(grade.description());
            return this.gradeRepository.save(gradeToUpdate);
        } else {
            throw new GradeNotFoundException("Nota no encontrada");
        }
    }

    @Override
    public Grade delete(Long id) {
        Optional<Grade> gradeOptional = this.gradeRepository.findById(id);
        if (gradeOptional.isPresent()) {
            Grade gradeToDelete = gradeOptional.get();
            this.gradeRepository.delete(gradeToDelete);
            return gradeToDelete;
        } else {
            throw new GradeNotFoundException("Nota no encontrada");
        }
    }

    @Override
    public List<Grade> findAll() {
        return this.gradeRepository.findAll();
    }

    @Override
    public List<Grade> findAllBySubjectIdAndUserOfSystemId(Long subjectId, Long userOfSystemId) {
        return this.gradeRepository.findAllBySubjectIdAndUserOfSystemId(subjectId, userOfSystemId);
    }
}

package com.empresadev.rrhhapi.service;

import java.util.List;
import java.util.Optional;

import com.empresadev.rrhhapi.model.dto.SubjectDto;
import com.empresadev.rrhhapi.model.entity.Subject;
import org.springframework.data.domain.Page;

public interface ISubjectService {

    Optional<Subject> findSubjectById(Long id);

    Page<Subject> findSubjectsByPageNumberAndPageSize(int page, int size);

    Subject createSubject(SubjectDto subject);

    Subject updateSubject(Long id, SubjectDto subject);

    Subject deleteSubjectById(Long id);

    List<Subject> findAllSubjects();
}

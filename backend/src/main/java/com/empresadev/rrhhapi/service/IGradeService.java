package com.empresadev.rrhhapi.service;
import java.util.List;
import java.util.Optional;

import com.empresadev.rrhhapi.model.dto.GradeDto;
import com.empresadev.rrhhapi.model.entity.Grade;
import org.springframework.data.domain.Page;
public interface IGradeService {

    Optional<Grade> findById(Long id);

    Page<Grade> findGradesByPageNumberAndPageSize(int page, int size);

    Grade save(GradeDto grade);

    Grade update(Long id, GradeDto grade);

    Grade delete(Long id);

    List<Grade> findAll();

    List<Grade> findAllBySubjectIdAndUserOfSystemId(Long subjectId, Long userOfSystemId);

}

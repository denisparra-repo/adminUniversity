package com.empresadev.rrhhapi.model.repository;

import com.empresadev.rrhhapi.model.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IGradeRepository extends JpaRepository<Grade, Long> {
    List<Grade> findAllBySubjectIdAndUserOfSystemId(Long subjectId, Long userOfSystemId);
}

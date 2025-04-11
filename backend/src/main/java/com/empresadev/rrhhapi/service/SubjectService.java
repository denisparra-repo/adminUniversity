package com.empresadev.rrhhapi.service;

import com.empresadev.rrhhapi.model.dto.SubjectDto;
import com.empresadev.rrhhapi.model.entity.Course;
import com.empresadev.rrhhapi.model.entity.Subject;
import com.empresadev.rrhhapi.model.entity.UserOfSystem;
import com.empresadev.rrhhapi.model.exception.SubjectNotFoundException;
import com.empresadev.rrhhapi.model.repository.ICourseRepository;
import com.empresadev.rrhhapi.model.repository.ISubjectRepository;
import com.empresadev.rrhhapi.model.repository.IUserOfSystemRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class SubjectService implements ISubjectService {

    private final ISubjectRepository iSubjectRepository;
    private final ICourseRepository iCourseRepository;
    private final IUserOfSystemRepository iUserOfSystemRepository;

    public SubjectService(ISubjectRepository iSubjectRepository, ICourseRepository iCourseRepository, IUserOfSystemRepository iUserOfSystemRepository) {
        this.iSubjectRepository = iSubjectRepository;
        this.iCourseRepository = iCourseRepository;
        this.iUserOfSystemRepository = iUserOfSystemRepository;
    }

    @Override
    public Optional<Subject> findSubjectById(Long id) {
        return this.iSubjectRepository.findById(id);
    }

    @Override
    public Page<Subject> findSubjectsByPageNumberAndPageSize(int page, int size) {
        return this.iSubjectRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public Subject createSubject(SubjectDto subject) {
        Subject newSubject = new Subject();
        newSubject.setName(subject.name());
        Optional<Course> course = iCourseRepository.findById(subject.courseId());
        Optional<UserOfSystem> userOfSystem = iUserOfSystemRepository.findById(subject.teacherId());
        newSubject.setCourse(course.get());
        newSubject.setUserOfSystem(userOfSystem.get());
        return this.iSubjectRepository.save(newSubject);
    }

    @Override
    public Subject updateSubject(Long id, SubjectDto subject) {
        Optional<Subject> subjectOptional = this.iSubjectRepository.findById(id);
        if (subjectOptional.isPresent()) {
            Subject subjectToUpdate = subjectOptional.get();
            subjectToUpdate.setName(subject.name());
            Optional<UserOfSystem> userOfSystem = iUserOfSystemRepository.findById(subject.teacherId());
            subjectToUpdate.setUserOfSystem(userOfSystem.get());
            return this.iSubjectRepository.save(subjectToUpdate);
        } else {
            throw new SubjectNotFoundException("Materia no encontrada");
        }
    }

    @Override
    public Subject deleteSubjectById(Long id) {
        Subject subject = this.iSubjectRepository.findById(id).orElse(null);
        if (subject != null) {
            this.iSubjectRepository.delete(subject);
            return subject;
        }
        throw new SubjectNotFoundException("Materia no encontrada");
    }

    @Override
    public List<Subject> findAllSubjects() {
        return this.iSubjectRepository.findAll();
    }
}

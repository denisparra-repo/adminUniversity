package com.empresadev.rrhhapi.service;

import com.empresadev.rrhhapi.model.dto.AddSubjectToCourseDto;
import com.empresadev.rrhhapi.model.dto.CourseDto;
import com.empresadev.rrhhapi.model.entity.Course;
import com.empresadev.rrhhapi.model.entity.Subject;
import com.empresadev.rrhhapi.model.exception.CourseNotFoundException;
import com.empresadev.rrhhapi.model.repository.ICourseRepository;
import com.empresadev.rrhhapi.model.repository.ISubjectRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService implements ICourseService {

    private final ICourseRepository iCourseRepository;
    private final ISubjectRepository iSubjectRepository;

    public CourseService(ICourseRepository iCourseRepository, ISubjectRepository iSubjectRepository) {
        this.iCourseRepository = iCourseRepository;
        this.iSubjectRepository = iSubjectRepository;
    }

    @Override
    public Optional<Course> findCourseById(Long id) {
        return this.iCourseRepository.findById(id);
    }

    @Override
    public Page<Course> findCoursesByPageNumberAndPageSize(int page, int size) {
        return this.iCourseRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public Course createCourse(CourseDto course) {
        Course newCourse = new Course();
        newCourse.setName(course.name());
        return this.iCourseRepository.save(newCourse);

    }

    @Override
    public Course updateCourse(Long id, CourseDto course) {
        Optional<Course> courseOptional = this.iCourseRepository.findById(id);
        if (courseOptional.isEmpty()) {
            throw new CourseNotFoundException("Carrera no encontrada");
        }
        Course courseUpdated = courseOptional.get();
        courseUpdated.setName(course.name());
        return this.iCourseRepository.save(courseUpdated);
    }

    @Override
    public Course deleteCourse(Long id) {
        Optional<Course> courseOptional = this.iCourseRepository.findById(id);
        if (courseOptional.isEmpty()) {
            throw new CourseNotFoundException("Carrera no encontrada");
        }
        Course courseDeleted = courseOptional.get();
        this.iCourseRepository.delete(courseDeleted);
        return courseDeleted;
    }

    @Override
    public List<Course> findAllCourses() {
        return this.iCourseRepository.findAll();
    }

    @Override
    public Course assignSubjectToCourse(AddSubjectToCourseDto addSubjectToCourseDto) {
        Optional<Course> courseOptional = this.iCourseRepository.findById(addSubjectToCourseDto.courseId());
        Optional<Subject> subjectOptional = this.iSubjectRepository.findById(addSubjectToCourseDto.subjectId());
        Course course = courseOptional.get();
        course.getSubjects().add(subjectOptional.get());
        return this.iCourseRepository.save(course);
    }
}

package com.empresadev.rrhhapi.service;

import com.empresadev.rrhhapi.model.dto.AddSubjectToCourseDto;
import com.empresadev.rrhhapi.model.dto.AssignGradeDto;
import com.empresadev.rrhhapi.model.dto.AssignSubjectDto;
import com.empresadev.rrhhapi.model.dto.CourseDto;
import com.empresadev.rrhhapi.model.entity.Course;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface ICourseService {

    Optional<Course> findCourseById(Long id);

    Page<Course> findCoursesByPageNumberAndPageSize(int page, int size);

    Course createCourse(CourseDto course);

    Course updateCourse(Long id, CourseDto course);

    Course deleteCourse(Long id);

    List<Course> findAllCourses();

    Course assignSubjectToCourse(AddSubjectToCourseDto addSubjectToCourseDto);

}

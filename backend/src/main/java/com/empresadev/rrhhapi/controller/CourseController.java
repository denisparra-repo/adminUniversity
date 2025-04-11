package com.empresadev.rrhhapi.controller;

import com.empresadev.rrhhapi.model.dto.AddSubjectToCourseDto;
import com.empresadev.rrhhapi.model.dto.CourseDto;
import com.empresadev.rrhhapi.model.entity.Course;
import com.empresadev.rrhhapi.model.exception.CourseNotFoundException;
import com.empresadev.rrhhapi.model.vo.StandarResponse;
import com.empresadev.rrhhapi.service.ICourseService;
import com.empresadev.rrhhapi.service.ISubjectService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/course")
public class CourseController {

    private final ICourseService iCourseService;

    public CourseController(ICourseService iCourseService) {
        this.iCourseService = iCourseService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCourseById(@PathVariable Long id) {
        Optional<Course> course = iCourseService.findCourseById(id);
        StandarResponse response = new StandarResponse();
        if (course.isEmpty()) {
            throw new CourseNotFoundException("Carrera no encontrada");
        } else {
            response.setMessage("Carrera encontrada");
            response.setData(course.get());
            response.setStatus(HttpStatus.OK.value());
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(response);
        }
    }

    @GetMapping("/page")
    public ResponseEntity<?> findCoursesByPageNumberAndPageSize(@RequestParam("pageNumber") Integer page, @RequestParam("pageSize") Integer size) {
        StandarResponse response = new StandarResponse();
        response.setMessage("Carreras encontradas");
        response.setData(iCourseService.findCoursesByPageNumberAndPageSize(page, size));
        response.setStatus(HttpStatus.OK.value());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @PostMapping
    public ResponseEntity<StandarResponse> createCourse(@Valid  @RequestBody CourseDto createCourseDto) {
        Course createdCourse = iCourseService.createCourse(createCourseDto);
        StandarResponse response = new StandarResponse();
        response.setMessage("Carrera creada exitosamente");
        response.setData(createdCourse);
        response.setStatus(HttpStatus.CREATED.value());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StandarResponse> updateCourse(@PathVariable("id") Long id, @Valid @RequestBody CourseDto createCourseDto) {
        Course updatedCourse = iCourseService.updateCourse(id, createCourseDto);
        StandarResponse response = new StandarResponse();
        response.setMessage("Carrera actualizada exitosamente");
        response.setData(updatedCourse);
        response.setStatus(HttpStatus.OK.value());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<StandarResponse> deleteCourse(@PathVariable("id") Long id) {
        Course deletedCourse = iCourseService.deleteCourse(id);
        StandarResponse response = new StandarResponse();
        response.setMessage("Carrera eliminada exitosamente");
        response.setData(deletedCourse);
        response.setStatus(HttpStatus.OK.value());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<?> getAllCourses() {
        StandarResponse response = new StandarResponse();
        response.setMessage("Carreras encontradas");
        response.setData(iCourseService.findAllCourses());
        response.setStatus(HttpStatus.OK.value());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @PostMapping("/subject")
    public ResponseEntity<StandarResponse> assignSubjectToCourse(@Valid @RequestBody AddSubjectToCourseDto addSubjectToCourseDto) {
        Course assignedCourse = iCourseService.assignSubjectToCourse(addSubjectToCourseDto);
        StandarResponse response = new StandarResponse();
        response.setMessage("Materia asignada exitosamente");
        response.setData(assignedCourse);
        response.setStatus(HttpStatus.OK.value());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }
}

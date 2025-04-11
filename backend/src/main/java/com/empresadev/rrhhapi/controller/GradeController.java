package com.empresadev.rrhhapi.controller;

import com.empresadev.rrhhapi.model.dto.AddSubjectToCourseDto;
import com.empresadev.rrhhapi.model.dto.CourseDto;
import com.empresadev.rrhhapi.model.dto.GradeDto;
import com.empresadev.rrhhapi.model.entity.Course;
import com.empresadev.rrhhapi.model.entity.Grade;
import com.empresadev.rrhhapi.model.exception.CourseNotFoundException;
import com.empresadev.rrhhapi.model.exception.GradeNotFoundException;
import com.empresadev.rrhhapi.model.vo.StandarResponse;
import com.empresadev.rrhhapi.service.ICourseService;
import com.empresadev.rrhhapi.service.IGradeService;
import com.empresadev.rrhhapi.service.ISubjectService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/grade")
public class GradeController {

    private final IGradeService iGradeService;

    public GradeController(IGradeService iGradeService) {
        this.iGradeService = iGradeService;
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getGradeById(@PathVariable Long id) {
        Optional<Grade> grade = iGradeService.findById(id);
        StandarResponse response = new StandarResponse();
        if (grade.isEmpty()) {
            throw new GradeNotFoundException("Nota no encontrada");
        } else {
            response.setMessage("Nota encontrada");
            response.setData(grade.get());
            response.setStatus(HttpStatus.OK.value());
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(response);
        }
    }

    @GetMapping("/page")
    public ResponseEntity<?> findCoursesByPageNumberAndPageSize(@RequestParam("pageNumber") Integer page, @RequestParam("pageSize") Integer size) {
        StandarResponse response = new StandarResponse();
        response.setMessage("Notas encontradas");
        response.setData(iGradeService.findGradesByPageNumberAndPageSize(page, size));
        response.setStatus(HttpStatus.OK.value());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @PostMapping
    public ResponseEntity<StandarResponse> createGrade(@Valid  @RequestBody GradeDto createGradeDto) {
        Grade createdGrade = iGradeService.save(createGradeDto);
        StandarResponse response = new StandarResponse();
        response.setMessage("Nota creada exitosamente");
        response.setData(createdGrade);
        response.setStatus(HttpStatus.CREATED.value());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StandarResponse> updateGrade(@PathVariable("id") Long id, @Valid @RequestBody GradeDto gradeDto) {
        Grade updatedGrade = iGradeService.update(id, gradeDto);
        StandarResponse response = new StandarResponse();
        response.setMessage("Nota actualizada exitosamente");
        response.setData(updatedGrade);
        response.setStatus(HttpStatus.OK.value());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<StandarResponse> deleteCourse(@PathVariable("id") Long id) {
        Grade deletedGrade = iGradeService.delete(id);
        StandarResponse response = new StandarResponse();
        response.setMessage("Nota eliminada exitosamente");
        response.setData(deletedGrade);
        response.setStatus(HttpStatus.OK.value());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<?> getAllGrades() {
        StandarResponse response = new StandarResponse();
        response.setMessage("Notas encontradas");
        response.setData(iGradeService.findAll());
        response.setStatus(HttpStatus.OK.value());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @GetMapping("/user/{id}/subject/{subjectId}")
    public ResponseEntity<?> getAllGradesBySubjectIdAndUserOfSystemId(@PathVariable("id") Long id, @PathVariable("subjectId") Long subjectId) {
        StandarResponse response = new StandarResponse();
        response.setMessage("Notas encontradas");
        response.setData(iGradeService.findAllBySubjectIdAndUserOfSystemId(subjectId, id));
        response.setStatus(HttpStatus.OK.value());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

}


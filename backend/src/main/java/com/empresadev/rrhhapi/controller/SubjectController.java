package com.empresadev.rrhhapi.controller;

import com.empresadev.rrhhapi.model.exception.SubjectNotFoundException;
import com.empresadev.rrhhapi.model.vo.StandarResponse;
import com.empresadev.rrhhapi.service.IGradeService;
import com.empresadev.rrhhapi.service.ISubjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/subject")
public class SubjectController {

    private final ISubjectService iSubjectService;

    public SubjectController(ISubjectService iSubjectService) {
        this.iSubjectService = iSubjectService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSubjectById(@PathVariable Long id) {
        Optional<com.empresadev.rrhhapi.model.entity.Subject> subject = iSubjectService.findSubjectById(id);
        StandarResponse response = new StandarResponse();
        if (subject.isEmpty()) {
            throw new SubjectNotFoundException("Materia no encontrada");
        } else {
            response.setMessage("Materia encontrada");
            response.setData(subject.get());
            response.setStatus(HttpStatus.OK.value());
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(response);
        }
    }

    @GetMapping("/page")
    public ResponseEntity<?> findSubjectsByPageNumberAndPageSize(@RequestParam("pageNumber") Integer page, @RequestParam("pageSize") Integer size) {
        StandarResponse response = new StandarResponse();
        response.setMessage("Materias encontradas");
        response.setData(iSubjectService.findSubjectsByPageNumberAndPageSize(page, size));
        response.setStatus(HttpStatus.OK.value());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @PostMapping
    public ResponseEntity<StandarResponse> createSubject(@RequestBody com.empresadev.rrhhapi.model.dto.SubjectDto createSubjectDto) {
        com.empresadev.rrhhapi.model.entity.Subject createdSubject = iSubjectService.createSubject(createSubjectDto);
        StandarResponse response = new StandarResponse();
        response.setMessage("Materia creada exitosamente");
        response.setData(createdSubject);
        response.setStatus(HttpStatus.CREATED.value());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StandarResponse> updateSubject(@PathVariable("id") Long id, @RequestBody com.empresadev.rrhhapi.model.dto.SubjectDto createSubjectDto) {
        com.empresadev.rrhhapi.model.entity.Subject updatedSubject = iSubjectService.updateSubject(id, createSubjectDto);
        StandarResponse response = new StandarResponse();
        response.setMessage("Materia actualizada exitosamente");
        response.setData(updatedSubject);
        response.setStatus(HttpStatus.OK.value());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<StandarResponse> deleteSubject(@PathVariable("id") Long id) {
        com.empresadev.rrhhapi.model.entity.Subject deletedSubject = iSubjectService.deleteSubjectById(id);
        StandarResponse response = new StandarResponse();
        response.setMessage("Materia eliminada exitosamente");
        response.setData(deletedSubject);
        response.setStatus(HttpStatus.OK.value());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<?> getAllSubjects() {
        StandarResponse response = new StandarResponse();
        response.setMessage("Materias encontradas");
        response.setData(iSubjectService.findAllSubjects());
        response.setStatus(HttpStatus.OK.value());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }
}

import { CommonModule, NgIf, NgFor, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { CourseService } from '../../services/course.service';
import { MatDialog } from '@angular/material/dialog';
import { UnsavedChangesConfirmationDialogComponent } from '../../common/unsaved-changes-confirmation-dialog/unsaved-changes-confirmation-dialog.component';
import { GradeService } from '../../services/grade.service';
import { SubjectService } from '../../services/subject.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-grade-create',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, ReactiveFormsModule, NgIf, MatSelectModule, MatCardModule, NgFor, NgForOf, MatProgressSpinnerModule, MatTooltipModule, UnsavedChangesConfirmationDialogComponent ],
  templateUrl: './grade-create.component.html',
  styleUrl: './grade-create.component.scss'
})
export class GradeCreateComponent implements OnInit {

  gradeForm: FormGroup;
  spinnerVisible = false;
  isToggled = false;
  subjects: any[] = [];
  students: any[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private gradeService: GradeService,
    private subjectService: SubjectService,
    private authService: AuthServiceService,
    public dialog: MatDialog,
    public themeService: CustomizerSettingsService,
    public toastService: ToastrService
  ) {
      this.gradeForm = this.fb.group({
        subjectId: ['', [Validators.required]],
        grade: ['', [Validators.required]],
        description: ['', [Validators.required]],
        userId: ['', [Validators.required]]
      });
      this.themeService.isToggled$.subscribe(isToggled => {
          this.isToggled = isToggled;
      });
    }

  ngOnInit(): void {
    this.spinnerVisible = true;
    forkJoin([
      this.subjectService.getAllSubjects(),
      this.authService.getUserByRole('student')
    ]).subscribe(([
      subjectResponse,
      authResponse
    ]) => {
       this.subjects = subjectResponse.data;
       this.students = authResponse.data;
       this.spinnerVisible = false;
    })
  }
    

  onSubmit() {
      if (this.gradeForm.valid) {
        this.spinnerVisible = true;
        const formValue = this.gradeForm.getRawValue();
        this.gradeService.postGrade(formValue).subscribe( res => {
          this.spinnerVisible = false;
          this.toastService.success(res.message);
          this.router.navigate(['/grade-list'])
        }, error => {
          this.toastService.error(error.message)
        })
      } else {
        this.toastService.error('Revise los datos del formulario y asegurese que los campos requeridos no esten en blanco.');
      }
  }

  cancelDialog(): void {
    if (this.gradeForm.touched) {
      const dialogRef = this.dialog.open(UnsavedChangesConfirmationDialogComponent, {
          data: {response: ''},
      });
      dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.router.navigate(['/grade-list'])
          }
      });
    } else {
      this.router.navigate(['/grade-list'])
    }  
  }
}


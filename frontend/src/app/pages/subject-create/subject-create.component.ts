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
import { SubjectService } from '../../services/subject.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-subject-create',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, ReactiveFormsModule, NgIf, MatSelectModule, MatCardModule, NgFor, NgForOf, MatProgressSpinnerModule, MatTooltipModule, UnsavedChangesConfirmationDialogComponent ],
  templateUrl: './subject-create.component.html',
  styleUrl: './subject-create.component.scss'
})
export class SubjectCreateComponent implements OnInit {

  subjectForm: FormGroup;
  spinnerVisible = false;
  isToggled = false;
  names: any[] = [];
  courses: any[] = [];
  teachers: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private subjectService: SubjectService,
    private courseService: CourseService,
    private authUserService: AuthServiceService,
    public dialog: MatDialog,
    public themeService: CustomizerSettingsService,
    public toastService: ToastrService
  ) {
      this.subjectForm = this.fb.group({
        name: ['', [Validators.required]],
        courseId: ['', [Validators.required]],
        teacherId: ['', [Validators.required]]
      });
      this.themeService.isToggled$.subscribe(isToggled => {
          this.isToggled = isToggled;
      });
    }

  ngOnInit(): void {
    this.spinnerVisible = true;
    forkJoin([
      this.courseService.getAllCourses(), 
      this.authUserService.getUserByRole('teacher')
    ]).subscribe(([
      courseResponse,
      userResponse
    ]) => {
      this.spinnerVisible = false;
       this.courses = courseResponse.data;
       this.teachers = userResponse.data;
    })
  }

  onSubmit() {
      if (this.subjectForm.valid) {
        this.spinnerVisible = true;
        const formValue = this.subjectForm.getRawValue();
        this.subjectService.postSubject(formValue).subscribe( res => {
          this.spinnerVisible = false;
          this.toastService.success(res.message);
          this.router.navigate(['/subject-list'])
        }, error => {
          this.toastService.error(error.message)
        })
      } else {
        this.toastService.error('Revise los datos del formulario y asegurese que los campos requeridos no esten en blanco.');
      }
  }

  cancelDialog(): void {
    if (this.subjectForm.touched) {
      const dialogRef = this.dialog.open(UnsavedChangesConfirmationDialogComponent, {
          data: {response: ''},
      });
      dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.router.navigate(['/subject-list'])
          }
      });
    } else {
      this.router.navigate(['/subject-list'])
    }  
  }
}


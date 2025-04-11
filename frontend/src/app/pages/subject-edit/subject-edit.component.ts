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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { CourseService } from '../../services/course.service';
import { MatDialog } from '@angular/material/dialog';
import { UnsavedChangesConfirmationDialogComponent } from '../../common/unsaved-changes-confirmation-dialog/unsaved-changes-confirmation-dialog.component';
import { SubjectService } from '../../services/subject.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-subject-edit',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, ReactiveFormsModule, NgIf, MatSelectModule, MatCardModule, NgFor, NgForOf, MatProgressSpinnerModule, MatTooltipModule, UnsavedChangesConfirmationDialogComponent ],
  templateUrl: './subject-edit.component.html',
  styleUrl: './subject-edit.component.scss'
})
export class SubjectEditComponent implements OnInit {

  subjectId: any;
  subjectForm: FormGroup;
  spinnerVisible = false;
  isToggled = false;
  names: any[] = [];
  courses: any[] = [];
  teachers: any[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activateRouter: ActivatedRoute,
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
    this.activateRouter.params.subscribe( params => {
      this.subjectId = params['id'];
      forkJoin([
        this.courseService.getAllCourses(), 
        this.authUserService.getUserByRole('teacher'),
        this.subjectService.getSubjectById(this.subjectId)
      ]).subscribe(([
        courseResponse,
        userResponse,
        subjectResponse
      ]) => {
        
        this.courses = courseResponse.data;
        this.teachers = userResponse.data;
        const subjectObject = {
          name: subjectResponse.data.name,
          courseId: subjectResponse.data.course.id,
          teacherId: subjectResponse.data.userOfSystem.id
        }
        this.subjectForm.patchValue(subjectObject);
        this.subjectForm.updateValueAndValidity();
        this.spinnerVisible = false;
      })
    })
  }  
    

  onSubmit() {
      if (this.subjectForm.valid) {
        this.spinnerVisible = true;
        const formValue = this.subjectForm.getRawValue();
        this.subjectService.updateSubject(this.subjectId, formValue).subscribe( res => {
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


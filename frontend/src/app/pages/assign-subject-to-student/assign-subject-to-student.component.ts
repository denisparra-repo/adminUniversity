import { CommonModule, NgIf, NgFor, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
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
import { forkJoin } from 'rxjs';
import { SubjectService } from '../../services/subject.service';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-assign-subject-to-student',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, ReactiveFormsModule, NgIf, MatSelectModule, MatCardModule, NgFor, NgForOf, MatProgressSpinnerModule, MatTooltipModule, UnsavedChangesConfirmationDialogComponent ],
  templateUrl: './assign-subject-to-student.component.html',
  styleUrl: './assign-subject-to-student.component.scss'
})
export class AssignSubjectToStudentComponent implements OnInit {

  assignForm: FormGroup;
  spinnerVisible = false;
  isToggled = false;
  users: any[] = [];
  subjects: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthServiceService,
    private subjectService: SubjectService,
    public dialog: MatDialog,
    public themeService: CustomizerSettingsService,
    public toastService: ToastrService
  ) {
      this.assignForm = this.fb.group({
        userId: ['', [Validators.required]],
        subjectId: ['', [Validators.required]]
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
      userResponse
    ]) => {
      this.spinnerVisible = false;
       this.subjects = subjectResponse.data;
       this.users = userResponse.data
    })
  }

  onSubmit() {
      if (this.assignForm.valid) {
        this.spinnerVisible = true;
        const formValue = this.assignForm.getRawValue();
        this.authService.addSubjectToUser(formValue).subscribe( res => {
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
    if (this.assignForm.touched) {
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


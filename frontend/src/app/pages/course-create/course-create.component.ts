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

@Component({
  selector: 'app-course-create',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, ReactiveFormsModule, NgIf, MatSelectModule, MatCardModule, NgFor, NgForOf, MatProgressSpinnerModule, MatTooltipModule, UnsavedChangesConfirmationDialogComponent ],
  templateUrl: './course-create.component.html',
  styleUrl: './course-create.component.scss'
})
export class CourseCreateComponent {

  courseId: any = null;
  courseForm: FormGroup;
  spinnerVisible = false;
  isToggled = false;
  names = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private courseService: CourseService,
    public dialog: MatDialog,
    public themeService: CustomizerSettingsService,
    public toastService: ToastrService
  ) {
      this.courseForm = this.fb.group({
        name: ['', [Validators.required]]
      });
      this.themeService.isToggled$.subscribe(isToggled => {
          this.isToggled = isToggled;
      });
    }
    

  onSubmit() {
      if (this.courseForm.valid) {
        this.spinnerVisible = true;
        const formValue = this.courseForm.getRawValue();
        this.courseService.postCourse(formValue).subscribe( res => {
          this.spinnerVisible = false;
          this.toastService.success(res.message);
          this.router.navigate(['/course-list'])
        }, error => {
          this.toastService.error(error.message)
        })
      } else {
        this.toastService.error('Revise los datos del formulario y asegurese que los campos requeridos no esten en blanco.');
      }
  }

  cancelDialog(): void {
    if (this.courseForm.touched) {
      const dialogRef = this.dialog.open(UnsavedChangesConfirmationDialogComponent, {
          data: {response: ''},
      });
      dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.router.navigate(['/course-list'])
          }
      });
    } else {
      this.router.navigate(['/course-list'])
    }  
  }
}


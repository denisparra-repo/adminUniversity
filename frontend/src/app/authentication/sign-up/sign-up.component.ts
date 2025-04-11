import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { UnsavedChangesConfirmationDialogComponent } from '../../common/unsaved-changes-confirmation-dialog/unsaved-changes-confirmation-dialog.component';

@Component({
    selector: 'app-sign-up',
    standalone: true,
    imports: [RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, ReactiveFormsModule, NgIf, MatSelectModule, MatProgressSpinnerModule, UnsavedChangesConfirmationDialogComponent],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

    // isToggled
    isToggled = false;
    roles = [{roleName: 'admin', rolValue: 'Administrador'},{roleName: 'teacher', rolValue: 'Docente'},{roleName: 'student', rolValue: 'Estudiante'}]
    spinnerVisible = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthServiceService,
        public dialog: MatDialog,
        public themeService: CustomizerSettingsService,
        public toastService: ToastrService
    ) {
        this.authForm = this.fb.group({
            name: ['', Validators.required],
            lastName: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            roles: ['', Validators.required],
        });
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    // Password Hide
    hide = true;

    // Form
    authForm: FormGroup;
    onSubmit() {
        if (this.authForm.valid) {
            this.spinnerVisible = true;
            const data = this.authForm.value;
            data.roles = data.roles.join();
            this.authService.createUser(data).subscribe(res => {
                this.spinnerVisible = false;
                this.toastService.success("Usuario registrado exitosamente");
                this.router.navigate(['/system-users'])
            })
        } else {
             this.toastService.error('Revise los datos del formulario y asegurese que los campos requeridos no esten en blanco.');
        }
    }

    cancelDialog(): void {
      if (this.authForm.touched) {
        const dialogRef = this.dialog.open(UnsavedChangesConfirmationDialogComponent, {
            data: {response: ''},
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.router.navigate(['/system-users'])
            }
        });
      } else {
        this.router.navigate(['/system-users'])
      }  
    }

}
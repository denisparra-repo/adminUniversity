import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { LOGIN_DTO } from '../../models/login.model';
import { ToastrService } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-sign-in',
    standalone: true,
    imports: [RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, ReactiveFormsModule, NgIf, MatProgressSpinnerModule],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

    // isToggled
    isToggled = false;

    spinnerVisible = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        public themeService: CustomizerSettingsService,
        private loginService: AuthServiceService,
        private toastr: ToastrService
    ) {
        this.authForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
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
            const data : LOGIN_DTO = this.authForm.value;
            this.loginService.login(data).subscribe(response => {
                this.toastr.success(response.message);
                this.loginService.getRoles().subscribe(res => {
                    this.spinnerVisible = false;
                    this.loginService.listener.next('');
                    this.router.navigate(['/dashboard']);
                })
            }, error => {
                this.spinnerVisible = false;
                this.toastr.error('Verifique las credenciales', 'Error');
            })
        } else {
             this.toastr.error('Revise los datos del formulario y asegurese que los campos requeridos no esten en blanco.');
        }
    }

}
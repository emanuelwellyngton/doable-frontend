import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LucideAngularModule, UserPlus, Eye, EyeOff } from 'lucide-angular';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirm = control.get('confirmPassword');
    if (!password || !confirm) return null;
    return password.value !== confirm.value ? { passwordMismatch: true } : null;
}

@Component({
    selector: 'app-sign-up',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, LucideAngularModule],
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
    readonly UserPlus = UserPlus;
    readonly Eye = Eye;
    readonly EyeOff = EyeOff;

    form: FormGroup;
    isLoading = signal(false);
    errorMessage = signal('');
    successMessage = signal('');
    showPassword = signal(false);
    showConfirm = signal(false);

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.form = this.fb.group(
            {
                username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
                password: ['', [Validators.required, Validators.minLength(8)]],
                confirmPassword: ['', Validators.required]
            },
            { validators: passwordMatchValidator }
        );
    }

    togglePassword(): void { this.showPassword.update(v => !v); }
    toggleConfirm(): void { this.showConfirm.update(v => !v); }

    onSubmit(): void {
        if (this.form.invalid || this.isLoading()) return;

        this.isLoading.set(true);
        this.errorMessage.set('');

        const { username, password } = this.form.value;
        this.authService.register(username, password).subscribe({
            next: () => {
                this.isLoading.set(false);
                this.successMessage.set('Account created!');
                setTimeout(() => this.router.navigate(['/tasks']), 1500);
            },
            error: (err) => {
                this.isLoading.set(false);
                this.errorMessage.set(
                    err.status === 409
                        ? 'Username already taken. Please choose another.'
                        : 'An error occurred. Please try again.'
                );
            }
        });
    }
}

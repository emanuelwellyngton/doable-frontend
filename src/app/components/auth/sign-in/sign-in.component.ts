import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LucideAngularModule, LogIn, Eye, EyeOff } from 'lucide-angular';

@Component({
    selector: 'app-sign-in',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, LucideAngularModule],
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
    readonly LogIn = LogIn;
    readonly Eye = Eye;
    readonly EyeOff = EyeOff;

    form: FormGroup;
    isLoading = signal(false);
    errorMessage = signal('');
    showPassword = signal(false);

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.form = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    togglePassword(): void {
        this.showPassword.update(v => !v);
    }

    onSubmit(): void {
        if (this.form.invalid || this.isLoading()) return;

        this.isLoading.set(true);
        this.errorMessage.set('');

        const { username, password } = this.form.value;
        this.authService.login(username, password).subscribe({
            next: () => {
                this.isLoading.set(false);
                this.router.navigate(['/tasks']);
            },
            error: (err) => {
                this.isLoading.set(false);
                this.errorMessage.set(
                    err.status === 401
                        ? 'Invalid username or password.'
                        : 'An error occurred. Please try again.'
                );
            }
        });
    }
}

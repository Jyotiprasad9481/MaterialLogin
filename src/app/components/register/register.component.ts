import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      
      this.authService.checkEmailExists(email).subscribe(
        exists => {
          if (exists) {
            this.errorMessage = 'Email already exists';
          } else {
            this.authService.register(email, password).subscribe(
              () => {
                this.router.navigate(['/login']);
              },
              error => {
                this.errorMessage = 'Registration failed. Please try again.';
              }
            );
          }
        },
        error => {
          this.errorMessage = 'An error occurred. Please try again.';
        }
      );
    }
  }
}

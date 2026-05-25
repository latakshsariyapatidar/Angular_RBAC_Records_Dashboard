import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '@core/services/auth.service';
import {User} from '@shared/interfaces/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;
  role :  'General User' | 'Admin' = 'General User';

  private authService = inject(AuthService);
  constructor(private router: Router) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }


    console.log('Login attempt:', { email: this.email });
    this.errorMessage = '';

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;

      const user: User = {
        _id: 'user-' + Math.random(),
        email : this.email,
        name : this.email.split('@')[0],
        role:this.role as 'General User' | 'Admin'
      }

      this.authService.setUser(user);

      this.router.navigate(['/dashboard']);
    }, 500);
  }

  clearError(){
    this.errorMessage = '';
  }
}

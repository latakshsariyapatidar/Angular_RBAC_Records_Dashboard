import { inject, Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User, AuthResponse } from '@shared/interfaces';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  currentUser = signal<User | null>(null);

  isAdmin = computed(() => this.currentUser()?.role === 'Admin');

  constructor() {}

  

  login(credentials: { email: string; password: string }) {
    return this.http
      .post<AuthResponse>('/api/auth/login', credentials, { withCredentials: true })
      .pipe(
        tap((response) => {
          this.currentUser.set(response.user);
        }),
        catchError((error) => {
          console.error('Login failed:', error);
          this.currentUser.set(null);
          this.router.navigate(['/login']);
          return throwError(() => error);
        }),
      );
  }

  setUser(user: User) {
    this.currentUser.set(user);
  }

  getUser() {
    return this.currentUser();
  }

  isLoggedIn() {
    return this.currentUser() !== null;
  }

  logout() {
    return this.http.post('/api/auth/logout', {}, { withCredentials: true }).pipe(
      tap(() => {
        this.currentUser.set(null);
        this.router.navigate(['/login']);
      }),
      catchError((error) => {
        console.error('Logout failed:', error);
        this.currentUser.set(null);
        this.router.navigate(['/login']);
        throw error;
      }),
    );
  }
}

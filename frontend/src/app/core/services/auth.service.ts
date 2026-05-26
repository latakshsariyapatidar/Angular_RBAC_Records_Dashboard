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
  // Injecting HttpClient and Router using Angular's inject function
  private http = inject(HttpClient);
  private router = inject(Router);

  // Key for storing user data in localStorage
  private readonly STORAGE_KEY = 'currentUser';

  // Signal to hold the current user state
  currentUser = signal<User | null>(null);

  // Computed property to check if the current user has an admin role
  isAdmin = computed(() => this.currentUser()?.role === 'Admin');

  // Constructor to restore session on service initialization
  constructor() {
    this.restoreSession();
  }

  // Method to handle user login
  login(credentials: { email: string; password: string }) {
    return this.http
      .post<AuthResponse>('/api/auth/login', credentials, { withCredentials: true })
      .pipe(
        tap((response) => {
          this.currentUser.set(response.user);
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(response.user));
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

  // Method to handle user logout
  logout() {
    return this.http.post('/api/auth/logout', {}, { withCredentials: true }).pipe(
      tap(() => {
        this.currentUser.set(null);
        localStorage.removeItem(this.STORAGE_KEY);
        this.router.navigate(['/login']);
      }),
      catchError((error) => {
        console.error('Logout failed:', error);
        this.currentUser.set(null);
        localStorage.removeItem(this.STORAGE_KEY);
        this.router.navigate(['/login']);
        throw error;
      }),
    );
  }

  // Method to restore user session from localStorage
  private restoreSession() {
    const storedUser = localStorage.getItem(this.STORAGE_KEY);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser) as User;
        console.log('Sessions Restored');
        this.currentUser.set(user);
      } catch (err) {
        console.error('Failed to restore session:', err);
        localStorage.removeItem(this.STORAGE_KEY);
      }
    }
  }
}

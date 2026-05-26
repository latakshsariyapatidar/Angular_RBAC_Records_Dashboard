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

  private readonly STORAGE_KEY = 'currentUser';

  currentUser = signal<User | null>(null);

  isAdmin = computed(() => this.currentUser()?.role === 'Admin');

  constructor() {
    this.restoreSession();
  }

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

  private restoreSession(){
    const storedUser = localStorage.getItem(this.STORAGE_KEY);
    if (storedUser){
      try{
        const user = JSON.parse(storedUser) as User;
        console.log("Sessions Restored");
        this.currentUser.set(user);
      }catch(err){
        console.error('Failed to restore session:', err);
        localStorage.removeItem(this.STORAGE_KEY);
      }
    }
  }
}

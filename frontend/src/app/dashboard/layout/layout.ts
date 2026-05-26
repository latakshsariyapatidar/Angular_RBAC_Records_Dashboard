import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { User } from '@shared/interfaces/user.model';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  sidebarOpen = true;
  currentUser: User | null = null;
  isDashboardHome = true;

  isLogginOut = false;

  constructor(private router: Router) {
    this.checkRoute();
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.checkRoute();
    });
  }

  checkRoute() {
    this.isDashboardHome = this.router.url === '/dashboard' || this.router.url === '/dashboard/';
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUser();

    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }
  }

  private authService = inject(AuthService);

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout() {
    if (this.isLogginOut) return;
    this.isLogginOut = true;

    this.authService.logout().subscribe({
      complete: () => {
        this.isLogginOut = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLogginOut = false;
        this.router.navigate(['/login']);
        throw err;
      },
    });
  }
  navigateTo(route: string) {
    this.router.navigate(['/dashboard', route]);
  }
}

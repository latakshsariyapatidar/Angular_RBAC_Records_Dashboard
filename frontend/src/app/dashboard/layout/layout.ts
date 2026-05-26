import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {AuthService} from '@core/services/auth.service';
import {User} from '@shared/interfaces/user.model';

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

  isLogginOut = false;

  constructor(private router: Router) {
  }

  ngOnInit(){
    this.currentUser = this.authService.currentUser();

    if (!this.currentUser){
      this.router.navigate(['/login']);
    }
  }

  private authService = inject(AuthService);

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout(){
    if (this.isLogginOut) return;
    this.isLogginOut = true;

    this.authService.logout().subscribe({
      complete: () => {
        this.isLogginOut = false;
        this.router.navigate(['/login']);
      },
      error : (err) => {
        this.isLogginOut = false;
        this.router.navigate(['/login']);
        throw err;
      }
    })
  }
  navigateTo(route : string) {
    this.router.navigate(['/dashboard', route]);
  }
}

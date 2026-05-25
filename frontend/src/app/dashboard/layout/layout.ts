import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {AuthService} from '@core/services/auth.service';
import {User} from '@shared/interfaces/user.model';
import {inject} from '@angular/core';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  sidebarOpen = true;
  currentUser: User | null = null;;

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
    console.log('Logging out user:', this.currentUser?.email);
    this.router.navigate(['/login']);
  }
  navigateTo(route : string) {
    console.log('Navigating to:', route);
    this.router.navigate(['/dashboard', route]);
  }
}

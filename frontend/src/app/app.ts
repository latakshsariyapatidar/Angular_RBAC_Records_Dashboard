import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: '<router-outlet></router-outlet>',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('frontend');
}

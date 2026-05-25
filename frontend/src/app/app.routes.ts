import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Layout } from './dashboard/layout/layout';

export const routes: Routes = [
  // Auth Routes
  { path: 'login', component: Login },

  //   Dashboard Routes
  { path: 'dashboard', component: Layout, children: [] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];

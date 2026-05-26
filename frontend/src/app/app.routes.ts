import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Layout } from './dashboard/layout/layout';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  // Auth Routes
  { path: 'login', component: Login },

  //   Dashboard Routes
  { path: 'dashboard', component: Layout, children: [], canActivate: [authGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];

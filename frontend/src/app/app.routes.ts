import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Layout } from './dashboard/layout/layout';
import { RecordList } from './features/records/record-list/record-list';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Auth Routes
  { path: 'login', component: Login },

  {
    path: 'dashboard',
    component: Layout,
    children: [
      {
        path: 'records',
        component: RecordList,
        canActivate: [authGuard],
      },
    ],
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];

import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Layout } from './dashboard/layout/layout';
import { RecordList } from './features/records/record-list/record-list';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

import { UserManagement } from './features/admin/user-management/user-management';

export const routes: Routes = [
  // Auth Routes
  { path: 'login', component: Login },
  {
    path: 'dashboard',
    component: Layout,
    children: [
      // Records page (all logged-in users can see)
      {
        path: 'records',
        component: RecordList,
        canActivate: [authGuard],
      },

      // Admin panel (admin only)
      {
        path: 'admin',
        component: UserManagement,
        canActivate: [adminGuard],
      },
    ],
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];

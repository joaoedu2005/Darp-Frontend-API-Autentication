import { Routes } from '@angular/router';
import { AuthWrapper } from './features/auth/components/auth-wrapper/auth-wrapper';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthWrapper },
];


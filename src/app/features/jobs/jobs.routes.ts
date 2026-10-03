import { Routes } from '@angular/router';

export const JOBS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./jobs').then((m) => m.Jobs),
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./pages/job-edit/job-edit').then((m) => m.JobEdit),
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/job-details/job-details').then((m) => m.JobDetails),
  },
];

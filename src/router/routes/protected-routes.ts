import { lazy } from 'react';

export const protectedRoutes = [
  {
    path: '/admin',
    component: lazy(() => import('@pages/Admin')), // Protected Admin page
    roles: ['admin'], // Only admin can access this
  },
];

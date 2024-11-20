import { lazy } from 'react';

export const privateRoutes = [
  {
    path: '/home',
    component: lazy(() => import('@pages/Home')), // Public Home page
  },
  {
    path: '/dashboard',
    component: lazy(() => import('@pages/Dashboard')), // Private Dashboard page
    roles: ['user', 'admin'],
  },
  {
    path: '/settings',
    component: lazy(() => import('@pages/Settings')), // Private Settings page
    roles: ['user'],
  },
  {
    path: '/logout',
    component: lazy(() => import('@pages/Logout')), // Private Settings page
    roles: ['user'],
  },
];

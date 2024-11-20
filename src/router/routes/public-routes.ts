import { lazy } from 'react';

export const publicRoutes = [
  {
    path: '/login',
    component: lazy(() => import('@pages/Login')), // Public Login page
  },
  {
    path: '/signup',
    component: lazy(() => import('@pages/SignUp')), // Public Login page
  },
  {
    path: '*',
    component: lazy(() => import('@pages/NotFound')), // 404 Not Found page
  },
];

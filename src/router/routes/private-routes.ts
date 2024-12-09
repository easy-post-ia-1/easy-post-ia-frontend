import { lazy } from 'react';

export const privateRoutes = [
  {
    path: '/',
    component: lazy(() => import('@pages/Home')), // Public Home page
  },
  {
    path: '/home',
    component: lazy(() => import('@pages/Home')), // Public Home page
  },
  {
    path: '/posts',
    component: lazy(() => import('@pages/Posts.tsx')), // Public Home page
  },
  {
    path: '/posts/:id',
    component: lazy(() => import('@pages/Post.tsx')), // Public Home page
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

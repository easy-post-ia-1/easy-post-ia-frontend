import { lazy } from 'react';

export const privateRoutes = [
  {
    path: '/',
    component: lazy(() => import('@pages/Home')), 
  },
  {
    path: '/home',
    component: lazy(() => import('@pages/Home')), 
  },
  {
    path: '/posts',
    component: lazy(() => import('@pages/Posts')), 
  },
  {
    path: '/posts/:id',
    component: lazy(() => import('@pages/Post')), 
  },
  {
    path: '/strategies/:id',
    component: lazy(() => import('@pages/StrategyDetail')),
  },
  {
    path: '/account',
    component: lazy(() => import('@pages/Account')), 
  },
  {
    path: '/dashboard',
    component: lazy(() => import('@pages/Dashboard')),
    roles: ['user', 'admin'],
  },
  {
    path: '/settings',
    component: lazy(() => import('@pages/Settings')),
    roles: ['user'],
  },
  {
    path: '/logout',
    component: lazy(() => import('@pages/Logout')),
    roles: ['user'],
  },
];

import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import { StrategyDetail } from '../pages/StrategyDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/strategies/:id',
    element: <StrategyDetail />,
  },
]); 
import { useMemo } from 'react';
import CottageRoundedIcon from '@mui/icons-material/CottageRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

export const useBottomNavigationOptions = () => {
  const defaultSettingBottomNav = useMemo(
    () => [
      {
        id: 0,
        label: 'home',
        redirectUrl: '/',
        icon: <CottageRoundedIcon />,
      },
      {
        id: 2,
        label: 'dashboard',
        redirectUrl: '/dashboard',
        icon: <DashboardRoundedIcon />,
      },
      {
        id: 1,
        label: 'posts',
        redirectUrl: '/posts',
        icon: <LocalShippingRoundedIcon />,
      },
      {
        id: 3,
        label: 'account',
        redirectUrl: '/account',
        icon: <AccountCircleRoundedIcon />,
      },
    ],
    []
  );

  return {
    bottomNav: defaultSettingBottomNav,
  };
};

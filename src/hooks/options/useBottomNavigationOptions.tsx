import { useMemo } from 'react';
import CottageRoundedIcon from '@mui/icons-material/CottageRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';

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
        id: 1,
        label: 'posts',
        redirectUrl: '/posts',
        icon: <LocalShippingRoundedIcon />,
      },
    ],
    []
  );

  return {
    bottomNav: defaultSettingBottomNav,
  };
};

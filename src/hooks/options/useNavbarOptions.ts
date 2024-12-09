import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const useNavbarOptions = () => {
  const navigate = useNavigate();

  const defaultSettingNav = useMemo(
    () => [
      {
        id: 'default-settings-nav-1',
        name: 'Account',
        onClick: () => navigate('/account'),
        // other array items
      },
      {
        id: 'default-settings-nav-2',
        name: 'Logout',
        onClick: () => navigate('/logout'),
      },
    ],
    []
  );

  const defaultPagesNav = useMemo(
    () => [
      {
        id: 'default-pages-nav-1',
        name: 'Home',
        onClick: () => navigate('/'),
      },
      {
        id: 'default-pages-nav-2',
        name: 'Posts',
        onClick: () => navigate('/posts'),
      },
    ],
    []
  );

  return {
    profileOptions: defaultSettingNav,
    pagesOptions: defaultPagesNav,
  };
};

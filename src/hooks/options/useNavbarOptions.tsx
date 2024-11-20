import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

function useNavbarOptions() {
  const navigate = useNavigate();

  const defaultSettingNav = useMemo(
    () => [
      {
        id: 1,
        name: 'Profile',
        onClick: () => navigate('/profile'),
      },
      {
        id: 2,
        name: 'Account',
        onClick: () => navigate('/account'),
        // other array items
      },
      {
        id: 3,
        name: 'Dashboard',
        onClick: () => navigate('/dashboard'),
      },
      {
        id: 4,
        name: 'Logout',
        onClick: () => navigate('/logout'),
      },
    ],
    []
  );

  return {
    profileOptions: defaultSettingNav,
  };
}

export default useNavbarOptions;

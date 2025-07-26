import { useBottomNavigationOptions } from '@hooks/options';
import { BottomNavigationAction, BottomNavigation, useMediaQuery, useTheme } from '@mui/material';
import { useOptBottomNav } from '@stores/useOptBottomNav';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@stores/useAuthStore';

function BottomNavigationMobile() {
  const { optionChosen, updateOptionChosen } = useOptBottomNav();
  const { bottomNav } = useBottomNavigationOptions();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { token } = useAuthStore();

  if (!token) {
    return null;
  }

  return (
    <>
      {matches && (
        <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
          <BottomNavigation
            showLabels
            value={optionChosen}
            onChange={(_, newValue) => {
              updateOptionChosen(newValue);
              const navOption = bottomNav.find(opt => opt.label === newValue);
              if (navOption && navOption.redirectUrl) {
                navigate(navOption.redirectUrl);
              }
            }}
          >
            {bottomNav.map(({ label, icon, id }) => (
              <BottomNavigationAction
                sx={{ textTransform: 'capitalize' }}
                key={id}
                label={label.charAt(0).toUpperCase() + label.slice(1)}
                value={label}
                icon={icon}
              />
            ))}
          </BottomNavigation>
        </div>
      )}
    </>
  );
}

export default BottomNavigationMobile;

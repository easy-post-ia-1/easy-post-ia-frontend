import { useBottomNavigationOptions } from '@hooks/options';
import { BottomNavigationAction, BottomNavigation, useMediaQuery, useTheme } from '@mui/material';
import { useOptBottomNav } from '@stores/useOptBottomNav';
import { useNavigate } from 'react-router-dom';

function BottomNavigationMobile() {
  const { optionChosen, updateOptionChosen } = useOptBottomNav();
  const { bottomNav } = useBottomNavigationOptions();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  return (
    <>
      {matches && (
        <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
          <BottomNavigation
            showLabels
            value={optionChosen}
            onChange={(_, newValue) => {
              updateOptionChosen(newValue);
              navigate(`/${newValue}`);
            }}
          >
            {bottomNav.map(({ label, icon, id }) => (
              <BottomNavigationAction
                sx={{ textTransform: 'capitalize' }}
                key={id}
                label={label}
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

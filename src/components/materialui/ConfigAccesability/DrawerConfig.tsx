import { Box, IconButton, SwipeableDrawer, Typography } from '@mui/material';
import { useState } from 'react';
import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';
import SwitchDarkMode from './SwitchDarkMode';
import CountrySelect from './CountrySelect';

// TODO: Translations
function DrawerConfig() {
  const [open, setOpen] = useState(false);

  const toggleDrawer =
    (newOpen: boolean = false) =>
    () =>
      setOpen(newOpen);

  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: '10rem', right: 0 }}>
        <IconButton aria-label="settings" size="large" onClick={toggleDrawer(true)}>
          <SettingsApplicationsRoundedIcon />
        </IconButton>
        <SwipeableDrawer
          anchor={'right'}
          sx={{ '&.MuiSwipeableDrawer-paper': { width: '20rem' } }}
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <Box sx={{ margin: '2rem 1rem 1rem 1.5rem' }}>
            <Typography variant="body1" mb={2}>
              MODE
            </Typography>
            <SwitchDarkMode />
            <Typography variant="body1" my={2}>
              LANGUAGE
            </Typography>

            <CountrySelect />
          </Box>
        </SwipeableDrawer>
      </Box>
    </Box>
  );
}

export default DrawerConfig;

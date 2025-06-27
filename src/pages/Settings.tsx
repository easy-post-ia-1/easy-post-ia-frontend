import AuthenticatedNavbar from '@components/navbar/AuthenticatedNavbar';
import BottomNavigationMobile from '@components/navbar/BottomNavigationMobile';
import { Box, useMediaQuery, useTheme } from '@mui/material';

export default function Settings() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <AuthenticatedNavbar />
      <Box sx={{ pb: isMobile ? 8 : 0 }}>
        <div>Settings</div>
      </Box>
      <BottomNavigationMobile />
    </>
  );
}

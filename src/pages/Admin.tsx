import AuthenticatedNavbar from '@components/navbar/AuthenticatedNavbar';
import { MobileBottomNavigation } from '@components/navigation/BottomNavigation';
import { Box, useMediaQuery, useTheme } from '@mui/material';

export default function Admin() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {!isMobile && <AuthenticatedNavbar />}
      <Box sx={{ pb: isMobile ? 8 : 0 }}>
        <div>Admin</div>
      </Box>
      {isMobile && <MobileBottomNavigation />}
    </>
  );
}

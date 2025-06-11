import AuthenticatedNavbar from '@components/navbar/AuthenticatedNavbar';
import { MobileBottomNavigation } from '@components/navigation/BottomNavigation';
import { Box, useMediaQuery, useTheme } from '@mui/material';

export default function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {!isMobile && <AuthenticatedNavbar />}
      <Box sx={{ pb: isMobile ? 8 : 0 }}>
        <div>Dashboard</div>
      </Box>
      {isMobile && <MobileBottomNavigation />}
    </>
  );
}

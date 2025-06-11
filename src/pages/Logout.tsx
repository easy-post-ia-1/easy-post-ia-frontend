import { useAuthStore } from '@stores/useAuthStore';
import { useUserStore } from '@stores/userStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import AuthenticatedNavbar from '@components/navbar/AuthenticatedNavbar';
import { MobileBottomNavigation } from '@components/navigation/BottomNavigation';

const Logout = () => {
  const logout = useUserStore((state) => state.logout);
  const { updateErrorToken, updateToken } = useAuthStore();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    logout();
    updateErrorToken(null);
    updateToken(null);
    navigate('/login');
  }, [logout, navigate]);

  return (
    <>
      {!isMobile && <AuthenticatedNavbar />}
      <Box sx={{ pb: isMobile ? 8 : 0 }}>
        {/* Logout logic will redirect, so nothing visible here */}
      </Box>
      {isMobile && <MobileBottomNavigation />}
    </>
  );
};

export default Logout;

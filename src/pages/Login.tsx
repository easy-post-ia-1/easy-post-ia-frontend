import Logo from '@components/navbar/Logo';
import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import LoginForm from '@components/get_started/LoginForm';
import BottomNavigationMobile from '@components/navbar/BottomNavigationMobile';

const Login: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Box display="flex" sx={{ pb: isMobile ? 8 : 0 }}>
        <div style={{ flex: 3 }}>
          <Container maxWidth="sm">
            <Box mt={4}>
              <Logo />
            </Box>
            <LoginForm />
          </Container>
        </div>

        <Box component="div" style={{ flex: 2 }} sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <div
            style={{
              backgroundColor: '#D8FFE8',
              borderRadius: '30px 0 0 30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div style={{ maxWidth: '200px', width: '100%' }}>
              <img src="/images/login/lettering_joinnow_big.png" alt="Join now text" style={{ maxWidth: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div style={{ maxWidth: '200px', width: '100%' }}>
              <img src="/images/login/young_man.png" alt="Young man in grayscale" style={{ maxWidth: '100%', height: 'auto', display: 'block' }} />
            </div>
          </div>
        </Box>
      </Box>
      <BottomNavigationMobile />
    </>
  );
};

export default Login;

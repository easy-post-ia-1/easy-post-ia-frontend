import Logo from '@components/navbar/Logo';
import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import SignUpForm from '@components/get_started/SignUpForm';
import AuthenticatedNavbar from '@components/navbar/AuthenticatedNavbar';
import BottomNavigationMobile from '@components/navbar/BottomNavigationMobile';

const SignUp: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <AuthenticatedNavbar />
      <Box display="flex" sx={{ pb: isMobile ? 8 : 0 }}>
        <div style={{ flex: 3 }}>
          <Container maxWidth="sm">
            <Box mt={4}>
              <Logo />
            </Box>
            <SignUpForm />
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
            <div style={{ maxWidth: '300px', width: '100%' }}>
              <img src="/images/signup/lettering_thanks.png" alt="Thanks lettering" style={{ maxWidth: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div style={{ maxWidth: '500px', width: '100%' }}>
              <img src="/images/signup/groupwork.png" alt="Group work in grayscale" style={{ maxWidth: '100%', height: 'auto', display: 'block' }} />
            </div>
          </div>
        </Box>
      </Box>
      <BottomNavigationMobile />
    </>
  );
};

export default SignUp;

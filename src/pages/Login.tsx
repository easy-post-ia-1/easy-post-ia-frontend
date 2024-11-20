import Logo from '@components/navbar/Logo';
import { Box, Container } from '@mui/material';

import joinNow from '@assets/images/login/lettering_joinnow_big.png';
import youngMan from '@assets/images/login/young_man.png';
import LoginForm from '@components/get_started/LoginForm';

export default function Login() {
  return (
    <Box display="flex">
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
            <img src={joinNow} alt="join now text'" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
          <div style={{ maxWidth: '200px', width: '100%' }}>
            <img src={youngMan} alt="Young man in grayscale" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        </div>
      </Box>
    </Box>
  );
}

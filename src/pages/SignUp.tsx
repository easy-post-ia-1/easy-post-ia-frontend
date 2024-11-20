import Logo from '@components/navbar/Logo';
import { Box, Container } from '@mui/material';
import thankLettering from '@assets/images/signup/lettering_thanks.png';
import groupWork from '@assets/images/signup/groupwork.png';
import SignUpForm from '@components/get_started/SignUpForm';

function SignUp() {
  return (
    <Box display="flex">
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
            <img src={thankLettering} alt="Thanks lettering" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
          <div style={{ maxWidth: '500px', width: '100%' }}>
            <img src={groupWork} alt="Group work in grayscale" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        </div>
      </Box>
    </Box>
  );
}

export default SignUp;

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import ProfileAvatar from './AvatarProfile';
import PageOptNav from './PageOptNav';
import Logo from './Logo';
import { useAuthStore } from '@stores/useAuthStore';
import { useMediaQuery, useTheme } from '@mui/material';

function AuthenticatedNavbar() {
  const { token } = useAuthStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!token || isMobile) {
    return null;
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Logo
            variantSize="body1"
            stylesImgLogo={{ maxWidth: '3rem' }}
            stylesLogoBox={{ display: 'flex', flexDirection: 'column', alignItems: 'self-start' }}
          />
          <PageOptNav />
          <ProfileAvatar />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AuthenticatedNavbar;

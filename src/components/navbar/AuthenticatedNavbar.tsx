import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import BottomNavigationMobile from './BottomNavigationMobile';
import ProfileAvatar from './AvatarProfile';
import PageOptNav from './PageOptNav';
import Logo from './Logo';

function AuthenticatedNavbar() {
  return (
    <>
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

        <BottomNavigationMobile />
      </AppBar>
    </>
  );
}

export default AuthenticatedNavbar;

import { BottomNavigation, BottomNavigationAction, useMediaQuery, useTheme } from '@mui/material';
import { Home, Article, Add, Person } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const MobileBottomNavigation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  if (!isMobile) return null;

  return (
    <BottomNavigation
      value={location.pathname}
      onChange={(_, newValue) => {
        navigate(newValue);
      }}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: '1px solid',
        borderColor: 'divider',
        zIndex: theme.zIndex.appBar
      }}
    >
      <BottomNavigationAction
        label={t('navigation.home')}
        value="/home"
        icon={<Home />}
      />
      <BottomNavigationAction
        label={t('navigation.posts')}
        value="/posts"
        icon={<Article />}
      />
      <BottomNavigationAction
        label={t('navigation.create')}
        value="/create"
        icon={<Add />}
      />
      <BottomNavigationAction
        label={t('navigation.account')}
        value="/account"
        icon={<Person />}
      />
    </BottomNavigation>
  );
};

export default MobileBottomNavigation; 
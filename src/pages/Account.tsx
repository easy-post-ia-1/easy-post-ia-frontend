import { createUserAdapter } from '@adapters/user.adapter';
import AuthenticatedNavbar from '@components/navbar/AuthenticatedNavbar';
import { useGetAccount } from '@hooks/queries/user/useProfileQuery';
import {
  Avatar,
  Box,
  Container,
  Typography,
  Skeleton,
  Checkbox,
  FormControlLabel,
  Alert,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
  Button,
} from '@mui/material';
import { useCompanySocialStatus } from '@hooks/queries/user/useCompanySocialStatusQuery';
import BottomNavigationMobile from '@components/navbar/BottomNavigationMobile';
import { useTranslation } from 'react-i18next';
import { capitalizeFirst } from '@utils/helpers';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@stores/userStore';
import { useAuthStore } from '@stores/useAuthStore';

function Account() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { logout } = useUserStore();
  const { updateErrorToken, updateToken } = useAuthStore();
  const { data = { user: {} } } = useGetAccount();
  const user = createUserAdapter(data?.user);
  const {
    data: socialStatusData,
    isLoading: isLoadingSocialStatus,
    isError: isErrorSocialStatus,
    error: errorSocialStatus,
  } = useCompanySocialStatus();

  const handleLogout = () => {
    logout();
    updateErrorToken(null);
    updateToken(null);
    navigate('/login');
  };

  return (
    <>
      <AuthenticatedNavbar />
      <Container maxWidth="sm" sx={{ mt: 4, pb: isMobile ? 8 : 0 }}>
        {/* Existing User Profile Box */}
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar alt="Profile Image" sx={{ width: 100, height: 100, mb: 2 }} />
          <Typography variant="h6">{user?.username}</Typography>
          <Typography variant="body1" color="textSecondary">
            {user?.email}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
            {capitalizeFirst(user?.role)}
          </Typography>
        </Box>

        {/* New Social Network Section Box */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom component="div">
            {t('account.socialStatus.title')}
          </Typography>
          {isLoadingSocialStatus && (
            <>
              <Skeleton variant="text" width="40%" height={40} />
              <Skeleton variant="rectangular" width="100%" height={30} sx={{ mt: 1, mb: 1 }} />
              <Skeleton variant="rectangular" width="100%" height={30} />
            </>
          )}
          {isErrorSocialStatus && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorSocialStatus?.message || t('account.socialStatus.errorLoad')}
            </Alert>
          )}
          {!isLoadingSocialStatus && !isErrorSocialStatus && (
            <>
              {socialStatusData?.networks && socialStatusData.networks.length > 0 ? (
                <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
                  <Grid container spacing={1}>
                    {socialStatusData.networks.map((network) => (
                      <Grid item xs={12} key={network.name}>
                        <FormControlLabel
                          control={<Checkbox checked={network.hasCredentials} disabled />}
                          label={network.name}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              ) : (
                <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
                  <Typography>
                    {socialStatusData ? t('account.socialStatus.noAccountsConfigured') : t('account.socialStatus.unavailable')}
                  </Typography>
                </Paper>
              )}
            </>
          )}
        </Box>

        {/* Logout Button - Mobile Only */}
        {isMobile && (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleLogout}
              sx={{ minWidth: '200px' }}
            >
              {t('account.logout')}
            </Button>
          </Box>
        )}
      </Container>
      <BottomNavigationMobile />
    </>
  );
}

export default Account;

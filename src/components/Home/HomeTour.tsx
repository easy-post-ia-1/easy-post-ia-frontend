import AuthenticatedNavbar from '@components/navbar/AuthenticatedNavbar';
import CreateStrategy from '@components/strategy/CreateStrategy';
import { Container, Grid, Paper, useMediaQuery, useTheme } from '@mui/material';
import StrategiesOverview from './StrategiesOverview';
import CalendarView from './CalendarView';
import BottomNavigationMobile from '@components/navbar/BottomNavigationMobile';
import { useTour } from '@reactour/tour';
import { useEffect } from 'react';
import { useGetAccount } from '@hooks/queries/user/useProfileQuery';

const HomeTour = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { setIsOpen } = useTour();
    const { data: userProfile, isLoading } = useGetAccount();

    // Initialize tour when user data is loaded
    useEffect(() => {
      if (!isLoading && !userProfile?.user?.did_tutorial) {
        console.log('Opening tour for new user');
        setIsOpen(true);
      }
    }, [isLoading, userProfile?.user?.did_tutorial, setIsOpen]);

    return (
      <>
        <AuthenticatedNavbar />
        <Container maxWidth="lg" sx={{ my: 6, pb: isMobile ? 8 : 0 }}>
          <Grid container spacing={3}>
            {/* Create Strategy Section */}
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }} data-tour="create-strategy">
                <CreateStrategy />
              </Paper>
            </Grid>

            {/* Strategies Overview Section */}
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%'} } data-tour="strategies-overview">
                <StrategiesOverview />
              </Paper>
            </Grid>

            {/* Calendar View Section */}
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%'} } data-tour="calendar-view">
                <CalendarView />
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <BottomNavigationMobile />
      </>
    );
};

export default HomeTour;
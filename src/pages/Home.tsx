import AuthenticatedNavbar from '@components/navbar/AuthenticatedNavbar';
import CreateStrategy from '@components/strategy/CreateStrategy';
import { Container, Grid, Paper, Box, useMediaQuery, useTheme } from '@mui/material';
import StrategiesOverview from '../components/Home/StrategiesOverview';
import CalendarView from '../components/Home/CalendarView';
import { MobileBottomNavigation } from '@components/navigation/BottomNavigation';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {!isMobile && <AuthenticatedNavbar />}
      <Container maxWidth="lg" sx={{ my: 6, pb: isMobile ? 8 : 0 }}>
        <Grid container spacing={3}>
          {/* Create Strategy Section */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <CreateStrategy />
            </Paper>
          </Grid>

          {/* Strategies Overview Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
              <StrategiesOverview />
            </Paper>
          </Grid>

          {/* Calendar View Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
              <CalendarView />
            </Paper>
          </Grid>
        </Grid>
      </Container>
      {isMobile && <MobileBottomNavigation />}
    </>
  );
};

export default Home;

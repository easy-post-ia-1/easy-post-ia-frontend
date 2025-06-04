import AuthenticatedNavbar from '@components/navbar/AuthenticatedNavbar';
import CreateStrategy from '@components/strategy/CreateStrategy';
import { Container, Grid } from '@mui/material';
import StrategiesOverview from '../components/Home/StrategiesOverview';
import CalendarView from '../components/Home/CalendarView';

const Home = () => {
  return (
    <div>
      <AuthenticatedNavbar />
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CreateStrategy />
          </Grid>
          <Grid item xs={12} md={6}>
            <StrategiesOverview />
          </Grid>
          <Grid item xs={12} md={6}>
            <CalendarView />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;

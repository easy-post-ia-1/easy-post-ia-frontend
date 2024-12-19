import AuthenticatedNavbar from '@components/navbar/AuthenticatedNavbar';
import CreateStrategy from '@components/strategy/CreateStrategy';
import { Box, Container, Divider, Skeleton, Typography } from '@mui/material';

const Home = () => {
  return (
    <div>
      <AuthenticatedNavbar />
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Typography variant="h5">Create strategy for the month</Typography>
        <Divider sx={{ mt: 2, mb: 6 }} />

        <Box my={4}>
          <Typography variant="h5">News</Typography>
          <Box sx={{ mt: 2, gap: '10px', display: 'flex', flexDirection: 'row' }}>
            <Skeleton variant="rectangular" width="100%" height={318} />
            <Skeleton variant="rectangular" width="100%" height={318} />
            <Skeleton variant="rectangular" width="100%" height={318} />
          </Box>
        </Box>

        <CreateStrategy />
      </Container>
    </div>
  );
};

export default Home;

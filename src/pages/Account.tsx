import { createUserAdapter } from '@adapters/user.adapter';
import AuthenticatedNavbar from '@components/navbar/AuthenticatedNavbar';
import { useGetAccount } from '@hooks/queries/user/useProfileQuery';
import { Avatar, Box, Container, Typography } from '@mui/material';

function Account() {
  const { data = { user: {} } } = useGetAccount();
  const user = createUserAdapter(data?.user);

  return (
    <>
      <AuthenticatedNavbar />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar alt="Profile Image" sx={{ width: 100, height: 100, mb: 2 }} />
          <Typography variant="h6">{user?.username}</Typography>
          <Typography variant="body1" color="textSecondary">
            {user?.email}
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default Account;

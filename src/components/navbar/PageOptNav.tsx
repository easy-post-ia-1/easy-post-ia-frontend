import { useNavbarOptions } from '@hooks/options';
import { Box, styled, Typography } from '@mui/material';

const PageTypography = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(2), // Theme-aware spacing
  display: 'block',
  cursor: 'pointer',

  '&:hover': {
    fontWeight: 'bold',
  },
}));

function PageOptNav() {
  const { pagesOptions } = useNavbarOptions();

  return (
    <Box sx={{ flexGrow: 1, justifyContent: { xs: 'inherit', md: 'center' }, display: { xs: 'none', md: 'flex' } }}>
      {pagesOptions.map(({ id = 'default-pages-nav-none', name = '', onClick = () => {} }) => (
        <PageTypography key={id} onClick={onClick}>
          {name}
        </PageTypography>
      ))}
    </Box>
  );
}

export default PageOptNav;

import { Box, Grid, Typography, Skeleton, Alert, Pagination } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useStrategies } from '../../hooks/queries/strategy/useStrategies';
import { StrategyCard } from '../StrategyCard';
import { useState } from 'react';

export const StrategiesOverview = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useStrategies({ page });

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {t('strategies.title')}
      </Typography>

      {isLoading ? (
        <Grid container spacing={2}>
          {[1, 2, 3].map((index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
          ))}
        </Grid>
      ) : error ? (
        <Alert severity="error">
          {t('strategies.error.loading')}
        </Alert>
      ) : !data?.strategies.length ? (
        <Alert severity="info">
          {t('strategies.empty.title')}
        </Alert>
      ) : (
        <>
          <Grid container spacing={2} alignItems="stretch">
            {data.strategies.map((strategy) => (
              <Grid item xs={12} sm={6} md={4} key={strategy.id} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <StrategyCard strategy={strategy} />
              </Grid>
            ))}
          </Grid>
          {data.pagination.pages > 1 && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination 
                count={data.pagination.pages} 
                page={page} 
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default StrategiesOverview;

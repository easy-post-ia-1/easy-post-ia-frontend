import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, CircularProgress, Alert, Pagination, Grid } from '@mui/material';

// Placeholder for StrategyCard component
const StrategyCard: React.FC<{ strategy: any }> = ({ strategy }) => (
  <Box sx={{ border: `2px solid ${strategy.color}`, p: 2, borderRadius: 1, height: '100%' }}>
    <Typography variant="h6">{strategy.name}</Typography>
    <Typography variant="body2">{strategy.description}</Typography>
  </Box>
);

import { fetchedStrategiesAdapter } from '@adapters/strategy.adapter';
import { STRATEGIES_PER_PAGE } from '@utils/constants/home.constants';
import { Strategy, FetchedStrategy } from '@models/strategy.model'; // Import the Strategy type

// Default (mock) API call - now returns data in the format FetchedStrategy[]
const defaultFetchStrategiesAPI = (page: number, limit: number): Promise<FetchedStrategy[]> => {
  console.log(`Fetching strategies with default mock: page ${page}, limit ${limit}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulating a larger dataset for pagination demonstration
      const allMockStrategiesData: FetchedStrategy[] = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1, // API might return number IDs
        name: `Strategy ${String.fromCharCode(65 + i)}`, // Alpha, Beta, ...
        description: `This is mock strategy ${String.fromCharCode(65 + i)}. Page: ${page}`,
      }));

      // Paginate the mock strategies
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedStrategies = allMockStrategiesData.slice(startIndex, endIndex);

      resolve(paginatedStrategies); // Return only the strategies for the current page
    }, 50); // Reduced timeout for faster tests if this default is ever used by mistake in tests
  });
};

interface StrategiesOverviewProps {
  fetchStrategiesApiOverride?: (page: number, limit: number) => Promise<FetchedStrategy[]>;
}

const StrategiesOverview: React.FC<StrategiesOverviewProps> = ({ fetchStrategiesApiOverride }) => {
  const { t } = useTranslation();
  const [strategies, setStrategies] = useState<Strategy[]>([]); // Use Strategy type
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  // const strategiesPerPage = 4; // Now using STRATEGIES_PER_PAGE from constants

  useEffect(() => {
    const fetchApi = fetchStrategiesApiOverride || defaultFetchStrategiesAPI;
    const fetchStrategies = async () => {
      setLoading(true);
      setError(null);
      try {
        // Actual API call would be to something like /api/v1/strategies?page=${page}&limit=${STRATEGIES_PER_PAGE}
        const rawStrategies = await fetchApi(page, STRATEGIES_PER_PAGE);
        // Adapt the fetched strategies
        const adaptedData = fetchedStrategiesAdapter(rawStrategies, page, STRATEGIES_PER_PAGE);

        setStrategies(adaptedData.strategies);
        setTotalPages(Math.ceil(adaptedData.total / STRATEGIES_PER_PAGE));
      } catch (err) {
        setError(t('strategiesOverview.errors.fetch'));
        console.error("Failed to fetch strategies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStrategies();
  }, [page, t, fetchStrategiesApiOverride]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (loading) {
    return (
      <Box>
        <Typography variant="h5" gutterBottom>{t('strategiesOverview.title')}</Typography>
        {/* Placeholder for loading skeletons */}
        <Grid container spacing={2}>
          {[...Array(STRATEGIES_PER_PAGE)].map((_, index) => (
            <Grid item xs={12} sm={6} key={index}>
               <Box sx={{ border: '1px solid grey', p: 2, borderRadius: 1, height: '120px' }}>
                <Typography variant="h6">{t('strategiesOverview.loading')}...</Typography>
               </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h5" gutterBottom>{t('strategiesOverview.title')}</Typography>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (strategies.length === 0) {
    return (
      <Box>
        <Typography variant="h5" gutterBottom>{t('strategiesOverview.title')}</Typography>
        <Typography>{t('strategiesOverview.emptyState')}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>{t('strategiesOverview.title')}</Typography>
      <Grid container spacing={2}>
        {strategies.map((strategy) => (
          <Grid item xs={12} sm={6} key={strategy.id}>
            <StrategyCard strategy={strategy} />
          </Grid>
        ))}
      </Grid>
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default StrategiesOverview;

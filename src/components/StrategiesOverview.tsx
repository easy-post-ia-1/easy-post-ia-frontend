import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { useStrategies } from '@hooks/queries/strategy/useStrategiesQuery';
import { StrategyCard } from './StrategyCard.tsx';

export const StrategiesOverview = () => {
  const { data, isLoading, error } = useStrategies();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        {error.message || 'Error loading strategies'}
      </Alert>
    );
  }

  if (!data?.strategies.length) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" color="text.secondary">
          No strategies found
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Your Strategies
      </Typography>
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={2}>
        {data.strategies.map((strategy) => (
          <StrategyCard key={strategy.id} strategy={strategy} />
        ))}
      </Box>
    </Box>
  );
}; 
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, CircularProgress, Chip, useMediaQuery, useTheme, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import { useStrategyQuery } from '@hooks/queries/strategy/useStrategyQuery';
import AuthenticatedNavbar from '@components/navbar/AuthenticatedNavbar';
import BottomNavigationMobile from '@components/navbar/BottomNavigationMobile';
import { useNavigate } from 'react-router-dom';

export const StrategyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data, isLoading, error } = useStrategyQuery({ id: id || '' });
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <>
        <AuthenticatedNavbar />
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
        <BottomNavigationMobile />
      </>
    );
  }

  if (error || !data?.strategy) {
    return (
      <>
        <AuthenticatedNavbar />
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Typography color="error">{error instanceof Error ? error.message : 'Strategy not found'}</Typography>
        </Box>
        <BottomNavigationMobile />
      </>
    );
  }

  const strategy = data.strategy;

  const formatDate = (date: string | null) => {
    if (!date) return t('strategy.notScheduled');
    return DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL);
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 0: return '#FFA500'; // pending
      case 1: return '#87CEEB'; // in_progress
      case 2: return '#90EE90'; // completed
      case 3: return '#FF0000'; // failed
      default: return '#FFA500';
    }
  };

  const getStatusKey = (status: number) => {
    switch (status) {
      case 0: return 'pending';
      case 1: return 'in_progress';
      case 2: return 'completed';
      case 3: return 'failed';
      default: return 'pending';
    }
  };

  return (
    <>
      <AuthenticatedNavbar />
      <Box p={3} pb={isMobile ? 8 : 3}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4">
              {t('strategy.title')} #{strategy.id}
            </Typography>
            <Chip
              label={t(`strategies.status.${getStatusKey(strategy.status)}`)}
              sx={{
                backgroundColor: getStatusColor(strategy.status),
                color: 'white',
                fontSize: '1rem',
                padding: '20px 10px'
              }}
            />
          </Box>

          <Box mb={3}>
            <Typography variant="h6" gutterBottom>{t('strategy.description')}</Typography>
            <Typography variant="body1">
              {strategy.description || t('strategy.noDescription')}
            </Typography>
          </Box>

          <Box mb={3}>
            <Typography variant="h6" gutterBottom>{t('strategy.schedule')}</Typography>
            <Typography variant="body1">
              {t('strategy.from')}: {formatDate(strategy.from_schedule)}
            </Typography>
            <Typography variant="body1">
              {t('strategy.to')}: {formatDate(strategy.to_schedule)}
            </Typography>
          </Box>

          <Box mb={3}>
            <Typography variant="h6" gutterBottom>{t('strategy.posts')}</Typography>
            <Typography variant="body1">
              {t('strategy.totalPosts')}: {strategy.posts_count || 0}
            </Typography>
            {strategy.posts && strategy.posts.length > 0 && (
              <Box mt={1} display="flex" flexWrap="wrap">
                {strategy.posts.map((post, index) => (
                  <Typography key={post.id} variant="body2" color="text.secondary" sx={{ mr: 0.5 }}>
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => navigate(`/posts/${post.id}`)}
                      sx={{ textDecoration: 'none' }}
                    >
                      (#{post.id})
                    </Link>
                    {index < strategy.posts!.length - 1 && ' - '}
                  </Typography>
                ))}
              </Box>
            )}
          </Box>

          <Box mb={3}>
            <Typography variant="h6" gutterBottom>{t('strategy.timestamps')}</Typography>
            <Typography variant="body2" color="text.secondary">
              {t('strategy.created')}: {DateTime.fromISO(strategy.created_at).toLocaleString(DateTime.DATETIME_FULL)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('strategy.updated')}: {DateTime.fromISO(strategy.updated_at).toLocaleString(DateTime.DATETIME_FULL)}
            </Typography>
          </Box>
        </Paper>
      </Box>
      <BottomNavigationMobile />
    </>
  );
};

export default StrategyDetail; 
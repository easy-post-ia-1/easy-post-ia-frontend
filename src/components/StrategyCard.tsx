import { Card, CardContent, Typography, Chip, Box, Link } from '@mui/material';
import { DateTime } from 'luxon';
import { Strategy, STRATEGY_STATUS } from '../models/strategy.model';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface StrategyCardProps {
  strategy: Strategy;
}

export const StrategyCard = ({ strategy }: StrategyCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const formatDate = (date: string | null) => {
    if (!date) return 'Not scheduled';
    return DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);
  };

  const getStatusKey = (status: number) => {
    switch (status) {
      case STRATEGY_STATUS.PENDING:
        return 'pending';
      case STRATEGY_STATUS.IN_PROGRESS:
        return 'in_progress';
      case STRATEGY_STATUS.COMPLETED:
        return 'completed';
      case STRATEGY_STATUS.FAILED:
        return 'failed';
      default:
        return 'pending';
    }
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case STRATEGY_STATUS.PENDING:
        return '#FFA500'; // Orange
      case STRATEGY_STATUS.IN_PROGRESS:
        return '#87CEEB'; // Light Blue
      case STRATEGY_STATUS.COMPLETED:
        return '#90EE90'; // Light Green
      case STRATEGY_STATUS.FAILED:
        return '#FF0000'; // Red
      default:
        return '#FFA500'; // Default to Orange
    }
  };

  const handleStrategyClick = () => {
    navigate(`/strategies/${strategy.id}`);
  };

  return (
    <Card sx={{ minHeight: 200, height: '100%' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
        {/* Header: Description + ID/Status */}
        <Box mb={2}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" sx={{ flexWrap: 'wrap' }}>
            <Typography variant="h6" sx={{
              flexGrow: 1,
              minWidth: 0,
              mr: 1,
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
            }}>
              {strategy.description || 'Untitled Strategy'}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} sx={{ flexShrink: 0, ml: 1 }}>
              <Link
                component="button"
                variant="body2"
                onClick={handleStrategyClick}
                sx={{ textDecoration: 'none' }}
              >
                #{strategy.id}
              </Link>
              <Chip
                label={t(`strategies.status.${getStatusKey(strategy.status)}`)}
                sx={{
                  backgroundColor: getStatusColor(strategy.status),
                  color: 'white',
                  height: '24px',
                  fontSize: '0.75rem'
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1 }} mb={2}>
          <Typography variant="body2" color="text.secondary" sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}>
            Schedule: {formatDate(strategy.from_schedule)} - {formatDate(strategy.to_schedule)}
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {t('strategiesOverview.postCount', { count: strategy.posts_count || 0 })}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}; 
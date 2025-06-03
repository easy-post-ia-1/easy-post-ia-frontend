import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';

// Define expected response type for clarity
interface CalendarDataResponse {
  isEmpty: boolean;
  data?: any[]; // Replace 'any' with actual event data type if known
}

// Default (mock) calendar data fetching
const defaultFetchCalendarDataAPI = (): Promise<CalendarDataResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate success or error randomly
      const randomValue = Math.random();
      if (randomValue > 0.9) {
        reject(new Error("Failed to load calendar data"));
      } else {
        // Simulate empty or with data
        const isEmpty = randomValue > 0.7; // Make it more predictable for default
        resolve({ isEmpty: isEmpty, data: isEmpty ? [] : [{date: '2024-07-15', events: ['Event 1']}] });
      }
    }, 50); // Reduced timeout for tests
  });
};

interface CalendarViewProps {
  fetchCalendarDataApiOverride?: () => Promise<CalendarDataResponse>;
}

const CalendarView: React.FC<CalendarViewProps> = ({ fetchCalendarDataApiOverride }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  useEffect(() => {
    const fetchApi = fetchCalendarDataApiOverride || defaultFetchCalendarDataAPI;
    const fetchCalendarData = async () => {
      setLoading(true);
      setError(null);
      setIsEmpty(false);
      try {
        const response = await fetchApi();
        setIsEmpty(response.isEmpty);
        // In a real scenario, you would set calendar events here
      } catch (err) {
        setError(t('calendarView.errors.fetch'));
        console.error("Failed to fetch calendar data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarData();
  }, [t]);

  if (loading) {
    return (
      <Box>
        <Typography variant="h5" gutterBottom>{t('calendarView.title')}</Typography>
        {/* Placeholder for loading skeleton */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', border: '1px dashed grey' }}>
          <CircularProgress />
          <Typography sx={{ml: 2}}>{t('calendarView.loading')}</Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h5" gutterBottom>{t('calendarView.title')}</Typography>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (isEmpty) {
    return (
      <Box>
        <Typography variant="h5" gutterBottom>{t('calendarView.title')}</Typography>
        <Typography>{t('calendarView.emptyState')}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>{t('calendarView.title')}</Typography>
      {/* Placeholder for actual Calendar component */}
      <Box sx={{ height: '300px', border: '1px solid lightgray', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6">[Calendar Placeholder]</Typography>
      </Box>
    </Box>
  );
};

export default CalendarView;

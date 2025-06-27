import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Alert, Skeleton, List, ListItem, ListItemText, Paper, CardActionArea } from '@mui/material';
import { useCalendarPostsQuery } from '@hooks/queries/calendar/useCalendarPostsQuery';
import { Post } from '@models/post.model';
import PostDetailModal from '@components/post/PostDetailModal';
import { DateTime } from 'luxon';
import DateRangeValue from '@components/date_range/DateRangeCalendarValue';

interface CalendarViewProps {
  // No longer need fetchCalendarDataApiOverride as we're using a hook
}

const CalendarView: React.FC<CalendarViewProps> = () => {
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState({
    fromSchedule: DateTime.now().startOf('month').toISO(),
    toSchedule: DateTime.now().endOf('month').toISO()
  });

  const { data, isLoading, isError, error } = useCalendarPostsQuery({
    from_date: dateRange.fromSchedule,
    to_date: dateRange.toSchedule,
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleOpenModal = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleDateRangeChange = (event: { target: { name: string; value: string | null } }) => {
    setDateRange(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h5" gutterBottom>{t('calendarView.title')}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 2, border: '1px dashed grey', borderRadius: 1 }}>
          <Skeleton variant="text" width="60%" height={30} />
          <Skeleton variant="rectangular" height={150} />
          <Skeleton variant="text" width="80%" height={20} />
          <Skeleton variant="rectangular" height={100} />
        </Box>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box>
        <Typography variant="h5" gutterBottom>{t('calendarView.title')}</Typography>
        <Alert severity="error">{t('calendarView.errors.fetch')}: {error?.message}</Alert>
      </Box>
    );
  }

  const posts = data?.posts || [];
  const isEmpty = posts.length === 0;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>{t('calendarView.title')}</Typography>
      
      <DateRangeValue 
        fromSchedule={dateRange.fromSchedule}
        toSchedule={dateRange.toSchedule}
        handleInputChange={handleDateRangeChange}
      />

      {
        isEmpty ? (
          <Typography>{t('calendarView.emptyState')}</Typography>
        ) : (
          <Box sx={{ height: '300px', border: '1px solid lightgray', borderRadius: 1, p: 2, overflowY: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              {t('calendarView.scheduledPosts', {
                from: DateTime.fromISO(dateRange.fromSchedule).toLocaleString(DateTime.DATE_FULL),
                to: DateTime.fromISO(dateRange.toSchedule).toLocaleString(DateTime.DATE_FULL)
              })}
            </Typography>
            <List>
              {posts.map((post) => (
                <Paper key={post.id} elevation={1} sx={{ mb: 1 }}>
                  <CardActionArea onClick={() => handleOpenModal(post)}>
                    <ListItem>
                      <ListItemText
                        primary={t('calendar.event.post_title', { title: post.title })}
                        secondary={DateTime.fromISO(post.programming_date_to_post).toLocaleString(DateTime.DATETIME_SHORT)}
                      />
                    </ListItem>
                  </CardActionArea>
                </Paper>
              ))}
            </List>
          </Box>
        )
      }
      <PostDetailModal isOpen={isModalOpen} onClose={handleCloseModal} post={selectedPost} />
    </Box>
  );
};

export default CalendarView;

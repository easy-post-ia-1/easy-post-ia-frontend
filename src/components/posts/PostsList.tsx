import { Box, Button, Grid, Typography } from '@mui/material';
import { usePosts } from '@hooks/queries/posts/usePostsQuery';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import PostCard from './PostCard';
import { useState } from 'react';
import { Post, PostFormValues } from '@models/post.model';

const PostsList = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    from_date: '',
    to_date: '',
    page: 1,
    page_size: 10
  });

  const { data, isLoading } = usePosts(filters);

  const handleFilterToday = () => {
    const today = DateTime.now();
    setFilters({
      ...filters,
      from_date: today.startOf('day').toISO(),
      to_date: today.endOf('day').toISO()
    });
  };

  const handleFilterWeek = () => {
    const today = DateTime.now();
    setFilters({
      ...filters,
      from_date: today.startOf('week').toISO(),
      to_date: today.endOf('week').toISO()
    });
  };

  const handleFilterMonth = () => {
    const today = DateTime.now();
    setFilters({
      ...filters,
      from_date: today.startOf('month').toISO(),
      to_date: today.endOf('month').toISO()
    });
  };

  const handleClearFilters = () => {
    setFilters({
      ...filters,
      from_date: '',
      to_date: ''
    });
  };

  if (isLoading) {
    return <Typography>{t('common.loading')}</Typography>;
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {t('posts.filters.title')}
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button variant="outlined" onClick={handleFilterToday}>
              {t('posts.filters.today')}
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={handleFilterWeek}>
              {t('posts.filters.this_week')}
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={handleFilterMonth}>
              {t('posts.filters.this_month')}
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="secondary" onClick={handleClearFilters}>
              {t('posts.filters.clear')}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={2}>
        {data?.posts.map((post: Post) => {
          const postFormValues: PostFormValues = {
            id: post.id,
            title: post.title,
            description: post.description,
            tags: post.tags,
            programmingDateToPost: DateTime.fromISO(post.programming_date_to_post),
            isPublished: post.is_published
          };
          return (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <PostCard {...postFormValues} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default PostsList; 
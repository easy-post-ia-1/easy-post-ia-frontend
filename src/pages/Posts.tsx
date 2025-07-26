import useForm from '@hooks/shared/useForm';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ChangeEvent } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PostsCards from '@components/posts/PostsCards';
import { useTranslation } from 'react-i18next';
import { initialValuesPostsQuery } from '@models/post.model';
import { usePosts, PostsResponse } from '@hooks/queries/posts/usePostsQuery';
import AuthenticatedNavbar from '@components/navbar/AuthenticatedNavbar';
import AddNewPost from '@components/posts/AddNewPost';
import usePaginationItemSize from '@hooks/shared/usePaginationItemSize';
import BottomNavigationMobile from '@components/navbar/BottomNavigationMobile';
import { Post, PostFormValues, PostSearch } from '@models/post.model';
import { DateTime } from 'luxon';
import useDebounce from '@hooks/shared/useDebounce';

const defaultResponse: PostsResponse = {
  status: { code: 200, message: '' },
  posts: [],
  pagination: { page: 1, pages: 1, count: 0 }
};

const POST_STATUS = ['pending', 'published', 'failed'] as const;

function Posts() {
  const { valuesForm, handleInputChange } = useForm<PostSearch>(initialValuesPostsQuery);
  const { 
    titlePost = '', 
    description = '', 
    tags = '', 
    status = '', 
    isPublished = '' 
  } = valuesForm;

  const debouncedTitlePost = useDebounce(titlePost, 500);
  const debouncedDescription = useDebounce(description, 500);
  const debouncedTags = useDebounce(tags, 500);
  const debouncedStatus = useDebounce(status, 500);
  const debouncedIsPublished = useDebounce(isPublished, 500);

  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { currentPage, handlePageChange } = usePaginationItemSize();
  
  const { data = defaultResponse } = usePosts({ 
    page: currentPage, 
    page_size: 10,
    title: debouncedTitlePost || undefined,
    description: debouncedDescription || undefined,
    tags: debouncedTags || undefined,
    status: debouncedStatus || undefined,
    is_published: debouncedIsPublished ? debouncedIsPublished === 'true' : undefined
  });
  
  const { pagination } = data;

  const postsFormValues: PostFormValues[] = (data.posts || []).map((post: Post) => ({
    id: post.id,
    title: post.title,
    description: post.description,
    tags: post.tags,
    category: post.category || '',
    emoji: post.emoji || '',
    programmingDateToPost: DateTime.fromISO(post.programming_date_to_post),
    isPublished: post.is_published
  }));

  return (
    <>
      <AuthenticatedNavbar />
      <Box my={3} ml={2}>
        <Typography variant="h4">{t('posts.title')}</Typography>
      </Box>
      <Box display="flex" sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: '30px', m: 2, pb: isMobile ? 8 : 0 }}>
        <Box display="flex" flexDirection="column" sx={{ flex: 1, gap: '10px' }}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-search-name-post">{t('post.form.label.search')}</InputLabel>
            <OutlinedInput
              id="outlined-adornment-search-name-post"
              type="text"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              label={t('post.form.label.search')}
              value={titlePost}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
              inputProps={{ name: 'titlePost' }}
            />
          </FormControl>

          <TextField
            label={t('post.form.label.desc')}
            variant="outlined"
            value={description}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
            inputProps={{ name: 'description' }}
          />

          <TextField
            label={t('post.form.label.tags')}
            variant="outlined"
            value={tags}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
            inputProps={{ name: 'tags' }}
          />

          <FormControl variant="outlined">
            <InputLabel id="status-label">{t('post.form.label.status')}</InputLabel>
            <Select
              labelId="status-label"
              value={status}
              onChange={(e) => handleInputChange(e)}
              label={t('post.form.label.status')}
              inputProps={{ name: 'status' }}
            >
              <MenuItem value="">{t('post.form.label.all')}</MenuItem>
              {POST_STATUS.map((status) => (
                <MenuItem key={status} value={status}>
                  {t(`posts.status.${status}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined">
            <InputLabel id="published-label">{t('post.form.label.published')}</InputLabel>
            <Select
              labelId="published-label"
              value={isPublished}
              onChange={(e) => handleInputChange(e)}
              label={t('post.form.label.published')}
              inputProps={{ name: 'isPublished' }}
            >
              <MenuItem value="">{t('post.form.label.all')}</MenuItem>
              <MenuItem value="true">{t('post.form.label.yes')}</MenuItem>
              <MenuItem value="false">{t('post.form.label.no')}</MenuItem>
            </Select>
          </FormControl>

          <Button id="search" variant="contained" size="large" onClick={() => {}}>
            {t('post.form.btn.search')}
          </Button>
        </Box>
        <div style={{ flex: 4 }}>
          <PostsCards posts={postsFormValues} />
          <Box mt={8} mb={2} display="flex" justifyContent="center">
            <Pagination count={pagination?.pages} page={currentPage} onChange={handlePageChange} />
          </Box>
        </div>
        <AddNewPost />
      </Box>
      <BottomNavigationMobile />
    </>
  );
}

export default Posts;

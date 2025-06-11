import useForm from '@hooks/shared/useForm';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Pagination,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PostsCards from '@components/posts/PostsCards';
import { useTranslation } from 'react-i18next';
import { initialValuesPostsQuery } from '@utils/constants';
import { usePosts } from '@hooks/queries/posts/usePostsQuery';
import AuthenticatedNavbar from '@components/navbar/AuthenticatedNavbar';
import AddNewPost from '@components/posts/AddNewPost';
import usePaginationItemSize from '@hooks/shared/usePaginationItemSize';
import { MobileBottomNavigation } from '@components/navigation/BottomNavigation';

// TODO: Implement filters
function Posts() {
  const { valuesForm, handleInputChange } = useForm(initialValuesPostsQuery);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { titlePost = '', yearCreated = '' } = valuesForm;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [disabledSignUp, setDisabledSignUp] = useState(false);
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { currentPage, handlePageChange } = usePaginationItemSize();
  const { data = {} } = usePosts({ page: currentPage, pageSize: 10 });
  const { pagination } = data;

  const uploadFormSignUp = useCallback(() => {}, [valuesForm]);

  return (
    <>
      {!isMobile && <AuthenticatedNavbar />}
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

          <Button id="search" variant="contained" size="large" disabled={disabledSignUp} onClick={uploadFormSignUp}>
            {/* {mutation?.isPending && !mutation?.isError ? <CircularProgressBtnLoading /> : t('form.btn_continue')} */}
            {t('post.form.btn.search')}
          </Button>
        </Box>
        <div style={{ flex: 4 }}>
          <PostsCards posts={data?.posts} />
          <Box mt={8} mb={2} display="flex" justifyContent="center">
            <Pagination count={pagination?.pages} page={currentPage} onChange={handlePageChange} />
          </Box>
        </div>
        <AddNewPost />
      </Box>
      {isMobile && <MobileBottomNavigation />}
    </>
  );
}

export default Posts;

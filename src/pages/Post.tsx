import ErrorFormHelperText from '@components/get_started/ErrorFormHelperText';
import useForm from '@hooks/shared/useForm';
import {
  Autocomplete,
  Box,
  Container,
  Fab,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ChangeEvent, useState, useEffect, useRef } from 'react';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { postCategoriesForAutocomplete } from '@utils/constants/categoriesTags.constants';
import { PostFormValues } from '@models/post.model';
import placeholderUploadPost from '@assets/images/posts/placeholder_upload_post.jpg';
import { useTranslation } from 'react-i18next';
import PostFabOptions from '@components/posts/PostFabOptions';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { usePostShow } from '@hooks/queries/posts/usePostsQuery';
import { useParams } from 'react-router-dom';
import { createPostAdapter } from '@adapters/post.adapter';
import AuthenticatedNavbar from '@components/navbar/AuthenticatedNavbar';
import BottomNavigationMobile from '@components/navbar/BottomNavigationMobile';
import { DateTime } from 'luxon';

const initialValuesPost: PostFormValues = {
  id: -1,
  title: '',
  description: '',
  imageUrl: undefined,
  tags: '',
  category: '',
  emoji: '',
  programmingDateToPost: DateTime.now(),
  isPublished: true,
};

function Post() {
  const { id } = useParams();
  const { valuesForm, handleInputChange, resetForm } = useForm<PostFormValues>(initialValuesPost);
  const [errorsForm, setErrorsForm] = useState<PostFormValues>(initialValuesPost);
  const isFormInitializedRef = useRef(false);
  const { title = '', description = '', imageUrl = '', tags = '', category = '', emoji = '', programmingDateToPost } = valuesForm;
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data } = usePostShow(Number(id));

  // Initialize form with post data only once when data is available
  useEffect(() => {
    if (data?.post && !isFormInitializedRef.current) {
      resetForm(createPostAdapter(data.post));
      isFormInitializedRef.current = true;
    }
  }, [data?.post, resetForm]);

  const handleErrorFormat = (errorFormat: PostFormValues) => setErrorsForm(errorFormat);

  return (
    <div style={{ position: 'relative' }}>
      <AuthenticatedNavbar />
      <Container maxWidth="md" sx={{ mt: 4, pb: isMobile ? 8 : 0 }}>
        <Typography variant="h4">{t(id ? 'post.title.edit' : 'post.title.create')}</Typography>

        <Box display="flex" flexDirection="column">
          <FormControl sx={{ mt: 4 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-post-title">{t('post.form.label.title')}</InputLabel>
            <OutlinedInput
              id="outlined-adornment-post-title"
              type="text"
              label={t('post.form.label.title')}
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
              inputProps={{ name: 'title' }}
            />
            <FormHelperText id="select-post-helper-text">
              <ErrorFormHelperText text={errorsForm?.title} />
            </FormHelperText>
          </FormControl>

          <FormControl sx={{ my: 4 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-post-desc">{t('post.form.label.desc')}</InputLabel>
            <OutlinedInput
              id="outlined-adornment-post-desc"
              type="text"
              label={t('post.form.label.desc')}
              value={description}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
              inputProps={{ name: 'description' }}
            />
            <FormHelperText id="select-post-helper-text">
              <ErrorFormHelperText text={errorsForm?.description} />
            </FormHelperText>
          </FormControl>

          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            {t('post.form.label.preview')}
          </Typography>
          <img
            alt="preview image"
            style={{ maxWidth: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain', aspectRatio: '16/9' }}
            src={imageUrl && imageUrl.length > 0 ? imageUrl : placeholderUploadPost}
          />

          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            {t('post.form.label.category')}
          </Typography>
          <Autocomplete
            value={category ? { label: `${emoji} ${category}`, year: 0 } : null}
            id="category-select"
            options={postCategoriesForAutocomplete}
            getOptionLabel={({ label }) => label}
            renderInput={(params) => <TextField {...params} label={t('post.form.label.category')} placeholder="Select category" />}
            onChange={(_, newValue) => {
              if (newValue) {
                const categoryName = newValue.label.split(' ').slice(1).join(' '); // Remove emoji
                const categoryEmoji = newValue.label.split(' ')[0]; // Get emoji
                handleInputChange({ target: { name: 'category', value: categoryName } });
                handleInputChange({ target: { name: 'emoji', value: categoryEmoji } });
              } else {
                handleInputChange({ target: { name: 'category', value: '' } });
                handleInputChange({ target: { name: 'emoji', value: '' } });
              }
            }}
            freeSolo={false}
            sx={{ width: '500px' }}
          />

          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            {t('post.form.label.tags')}
          </Typography>
          <TextField
          name='tags'
            label={t('post.form.label.tags')}
            variant="outlined"
            value={tags}
            onChange={(e) => handleInputChange({ target: { name: 'tags', value: e.target.value } })}
            placeholder="Enter tags separated by commas"
            sx={{ width: '500px' }}
          />

          <Box sx={{ mt: 3, mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {t('post.form.label.date')}
            </Typography>
            <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="en">
              <DateTimePicker
                value={programmingDateToPost}
                label={t('post.form.label.date')}
                onChange={(newValue = null) =>
                  handleInputChange({
                    target: { name: 'programmingDateToPost', value: newValue },
                  })
                }
              />
            </LocalizationProvider>
          </Box>
        </Box>
      </Container>
      <div style={{ position: 'fixed', bottom: '6rem', left: '1rem' }}>
        <Fab color="secondary" size="medium" aria-label="reset" onClick={() => resetForm()}>
          <RotateLeftIcon />
        </Fab>
      </div>
      <div id="back" style={{ position: 'fixed', bottom: '6rem', right: '1rem' }}>
        <PostFabOptions 
          id={Number(id)} 
          valuesForm={valuesForm} 
          handleErrorFormat={handleErrorFormat}
          onTemplateSelect={(updatedValues: PostFormValues) => {            
            // Update the form with template values
            if (updatedValues.title) {
              handleInputChange({ target: { name: 'title', value: updatedValues.title } });
            }
            if (updatedValues.description) {
              handleInputChange({ target: { name: 'description', value: updatedValues.description } });
            }
            if (updatedValues.tags) {
              handleInputChange({ target: { name: 'tags', value: updatedValues.tags } });
            }
            if (updatedValues.imageUrl) {
              handleInputChange({ target: { name: 'imageUrl', value: updatedValues.imageUrl } });
            }
            if (updatedValues.category) {
              handleInputChange({ target: { name: 'category', value: updatedValues.category } });
            }
            if (updatedValues.emoji) {
              handleInputChange({ target: { name: 'emoji', value: updatedValues.emoji } });
            }
          }}
        />
      </div>
      <BottomNavigationMobile />
    </div>
  );
}

export default Post;

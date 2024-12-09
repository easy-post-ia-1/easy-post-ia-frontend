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
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { initialValuesPost, top100Films } from '@utils/constants';

import placeholderUploadPost from '@assets/images/posts/placeholder_upload_post.jpg';
import { useTranslation } from 'react-i18next';
import PostFabOptions from '@components/posts/PostFabOptions';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { usePostShow } from '@hooks/queries/posts/usePostsQuery';
import { useParams } from 'react-router-dom';
import { createPostAdapter } from '@adapters/post.adapter';
import { PostFormValues } from '@models/post.model';
import AuthenticatedNavbar from '@components/navbar/AuthenticatedNavbar';

function Post() {
  const { id } = useParams();
  const { valuesForm, handleInputChange, resetForm } = useForm(initialValuesPost);
  const [errorsForm, setErrorsForm] = useState(initialValuesPost);
  const { title = '', description = '', imageUrl = '', tags = '', programmingDateToPost } = valuesForm;
  const { t } = useTranslation();
  const { data } = usePostShow(Number(id));

  useEffect(() => {
    if (data) resetForm(createPostAdapter(data?.post));
  }, [data]);

  const handleErrorFormat = (errorFormat: PostFormValues) => setErrorsForm(errorFormat);

  return (
    <div style={{ position: 'relative' }}>
      <AuthenticatedNavbar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4">{t('post.title.create')}</Typography>

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
            src={imageUrl?.length > 0 ? imageUrl : placeholderUploadPost}
          />

          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            {t('post.form.label.tags')}
          </Typography>
          <Autocomplete
            multiple
            value={tags?.length > 0 ? tags.split(',').map((tag) => ({ label: tag, year: 0 })) : []}
            limitTags={2}
            id="multiple-limit-tags"
            options={top100Films}
            getOptionLabel={({ label }) => label}
            renderInput={(params) => <TextField {...params} label="Categories" placeholder="Manufacturing" />}
            onChange={(_, newInputValue) => {
              const newTags = newInputValue.map((_) => _.label).join(',');
              handleInputChange({ target: { name: 'tags', value: newTags } });
            }}
            sx={{ width: '500px' }}
          />

          <Box sx={{ mt: 3, mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {t('post.form.label.date')}
            </Typography>
            <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="en">
              <DateTimePicker
                value={programmingDateToPost}
                label="Basic date time picker"
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
        <PostFabOptions id={Number(id)} valuesForm={valuesForm} handleErrorFormat={handleErrorFormat} />
      </div>
    </div>
  );
}

export default Post;

import { uploadPostAdapter } from '@adapters/post.adapter';
import { usePostCreate, usePostUpdate, usePostDestroy } from '@hooks/mutations/posts/usePostsMutation';
import { PostFormValues } from '@models/post.model';
import { groupErrorMessages } from '@utils/errors';
import { postSchema } from '@utils/validations/post';
import { t } from 'i18next';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import DeleteIcon from '@mui/icons-material/Delete';
import { Error } from '@models/error.model';

interface PostFabPublishSaveDelProps {
  valuesForm: PostFormValues;
  id: number;
  handleErrorFormat: (errorFormat: PostFormValues) => void;
}

// TODO: Refactorize and simplified more save and publish
function usePostFabPublishSaveDel({ valuesForm, id, handleErrorFormat = () => {} }: PostFabPublishSaveDelProps) {
  const navigate = useNavigate();
  const mutationPostCreate = usePostCreate();
  const mutationPostUpdate = usePostUpdate();
  const mutationPostDestroy = usePostDestroy();

  const actions = useMemo(() => {
    return [
      {
        id: 0,
        icon: <DeleteIcon />,
        name: t('post.fab.delete'),
        onClick: () => {
          mutationPostDestroy.mutate(id);
          navigate('/posts');
        },
      },
      {
        id: 1,
        icon: <SaveIcon />,
        name: t('post.fab.save'),
        onClick: () => {
          const { success = false, error = null } = postSchema.safeParse(valuesForm);

          if (!success) {
            const formatErrors =
              error?.issues
                ?.map(({ message, path }: Error) => ({ message, path }))
                .filter((error): error is { message: string; path: string[] } => error !== undefined) || [];

            handleErrorFormat(groupErrorMessages(formatErrors) as unknown as PostFormValues);
            return;
          }

          if (id === -1) {
            const cpyPost = { ...valuesForm };
            delete cpyPost.id;
            delete cpyPost.imageUrl;
            mutationPostCreate.mutate(uploadPostAdapter(valuesForm));
          } else {
            mutationPostUpdate.mutate(uploadPostAdapter({ ...valuesForm, isPublished: false }));
          }

          navigate('/posts');
        },
      },
      {
        id: 2,
        icon: <PrintIcon />,
        name: t('post.fab.publish'),
        onClick: () => {
          const { success = false, error = null } = postSchema.safeParse(valuesForm);

          if (!success) {
            const formatErrors =
              error?.issues
                ?.map(({ message, path }: Error) => ({ message, path }))
                .filter((error): error is { message: string; path: string[] } => error !== undefined) || [];

            handleErrorFormat(groupErrorMessages(formatErrors) as unknown as PostFormValues);
            return;
          }

          if (id === -1) {
            const cpyPost = { ...valuesForm };
            delete cpyPost.id;
            delete cpyPost.imageUrl;
            mutationPostCreate.mutate(uploadPostAdapter(valuesForm));
          } else {
            mutationPostUpdate.mutate(uploadPostAdapter({ ...valuesForm, isPublished: false }));
          }

          navigate('/posts');
        },
      },
    ];
  }, [valuesForm, mutationPostUpdate, mutationPostDestroy, id]);

  return { actions };
}

export default usePostFabPublishSaveDel;

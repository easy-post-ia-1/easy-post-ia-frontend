import { uploadPostAdapter } from '@adapters/post.adapter';
import { usePostCreate, usePostUpdate, usePostDestroy } from '@hooks/mutations/posts/usePostsMutation';
import { PostFabPublishSaveDelProps, PostFormValues } from '@models/post.model';
import { groupErrorMessages } from '@utils/errors';
import { postSchema } from '@utils/validations/post';
import { t } from 'i18next';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import DeleteIcon from '@mui/icons-material/Delete';
import TemplateIcon from '@mui/icons-material/Description';
import { Error } from '@models/error.model';

// TODO: Refactorize and simplified more save and publish
function usePostFabPublishSaveDel({ valuesForm, id, handleErrorFormat = () => {} }: PostFabPublishSaveDelProps) {
  const navigate = useNavigate();
  const mutationPostCreate = usePostCreate();
  const mutationPostUpdate = usePostUpdate();
  const mutationPostDestroy = usePostDestroy();

  const actions = useMemo(() => {
    return [
      {
        keyId: 'delete-icon',
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
        icon: <TemplateIcon />,
        name: t('post.fab.template'),
        onClick: () => {
          // This will be handled by the parent component
          console.log('Template action clicked');
        },
      },
      {
        keyId: 'save-icon',
        id: 2,
        icon: <SaveIcon />,
        name: t('post.fab.save'),
        onClick: () => {
          if (!valuesForm.category || !valuesForm.emoji) {
            handleErrorFormat({
              ...valuesForm,
              category: !valuesForm.category ? "Category can't be blank" : '',
              emoji: !valuesForm.emoji ? "Emoji can't be blank" : '',
            });
            return;
          }

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
            const cpyPost = uploadPostAdapter(valuesForm);
            delete cpyPost.id;
            delete cpyPost?.image_url;
            mutationPostCreate.mutate(cpyPost);
          } else {
            mutationPostUpdate.mutate(uploadPostAdapter({ ...valuesForm, isPublished: false }));
          }

          navigate('/posts');
        },
      },
      {
        keyId: 'publish-icon',
        id: 3,
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
            const cpyPost = uploadPostAdapter(valuesForm);
            delete cpyPost.id;
            delete cpyPost?.image_url;
            mutationPostCreate.mutate(cpyPost);
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

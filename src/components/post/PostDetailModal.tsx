import React from 'react';
import { Modal, Box, Typography, Button, IconButton, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { Post, POST_STATUS } from '@models/post.model';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';

interface PostDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', md: '60%', lg: '40%' },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto',
};

const POST_STATUS_ORDERED = [
  POST_STATUS.PENDING,
  POST_STATUS.PUBLISHING,
  POST_STATUS.PUBLISHED,
  POST_STATUS.FAILED_IMAGE,
  POST_STATUS.FAILED_PUBLISH,
  POST_STATUS.FAILED_NETWORK,
  POST_STATUS.FAILED_AUTH,
  POST_STATUS.CANCELLED,
  POST_STATUS.DRAFT,
  POST_STATUS.SCHEDULED,
];

export const PostDetailModal: React.FC<PostDetailModalProps> = ({ isOpen, onClose, post }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getStatusInfo = (status: number) => {
    return POST_STATUS_ORDERED[status] || POST_STATUS.PENDING; // Fallback
  };

  const handleViewPost = () => {
    if (post?.id) {
      navigate(`/posts/${post.id}`);
      onClose();
    }
  };

  if (!post) {
    return null;
  }

  const statusInfo = getStatusInfo(post.status);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="post-detail-modal-title"
      aria-describedby="post-detail-modal-description"
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="post-detail-modal-title" variant="h5" component="h2" gutterBottom>
          {t('postModal.title')} #{post.id}
        </Typography>

        <Box mb={2}>
          <Typography variant="h6">{t('postModal.description')}</Typography>
          <Typography variant="body1">{post.description || t('postModal.noDescription')}</Typography>
        </Box>

        {post.tags && post.tags.length > 0 && (
          <Box mb={2}>
            <Typography variant="h6">{t('postModal.tags')}</Typography>
            <Typography variant="body1">{post.tags}</Typography>
          </Box>
        )}

        <Box mb={2}>
          <Typography variant="h6">{t('postModal.schedule')}</Typography>
          <Typography variant="body1">{DateTime.fromISO(post.programming_date_to_post).toLocaleString(DateTime.DATETIME_FULL)}</Typography>
        </Box>

        <Box mb={2}>
          <Typography variant="h6">{t('postModal.status')}</Typography>
          <Chip
            label={t(`posts.status.${statusInfo.key}`)}
            sx={{
              backgroundColor: statusInfo.color,
              color: 'white',
            }}
          />
        </Box>

        <Box mb={2}>
          <Typography variant="h6">{t('postModal.publish')}</Typography>
          <Typography variant="body1">{post.is_published ? 'Yes' : 'No'}</Typography>
        </Box>

        {post.strategy?.description && (
          <Box mb={2}>
            <Typography variant="h6">{t('postModal.strategy')}</Typography>
            <Typography variant="body1">{post.strategy.description}</Typography>
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleViewPost}
          sx={{ mt: 2 }}
        >
          {t('postModal.viewPost')}
        </Button>
      </Box>
    </Modal>
  );
};

export default PostDetailModal; 
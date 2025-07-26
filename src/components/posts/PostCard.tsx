import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import placeholderUploadPost from '@assets/images/posts/placeholder_upload_post.jpg';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PostFormValues } from '@models/post.model';
import { SxProps } from '@mui/material';
import { trimText } from '@utils/helpers';

interface PostCardProps extends PostFormValues {
  cardSx?: SxProps;
}

function PostCard({ id = -1, title = '', description = '', imageUrl = '', cardSx }: PostCardProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Card sx={cardSx || { height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl.length > 0 ? imageUrl : placeholderUploadPost}
          alt={'Image preview'}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div" className="post-title">
            {trimText(title)}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {trimText(description)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button id={`btn-edit-${id}`} size="small" color="primary" onClick={() => navigate(`/posts/${id}`)}>
          {t('general.btn.edit')}
        </Button>
      </CardActions>
    </Card>
  );
}

export default PostCard;

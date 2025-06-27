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

function PostCard({ id = -1, title = '', description = '', imageUrl = '' }: PostFormValues) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={imageUrl.length > 0 ? imageUrl : placeholderUploadPost}
            alt={'Image preview'}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={() => navigate(`/posts/${id}`)}>
            {t('general.btn.edit')}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default PostCard;

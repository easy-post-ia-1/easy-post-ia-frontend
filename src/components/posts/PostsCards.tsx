import { Grid } from '@mui/material';
import PostCard from './PostCard';
import { PostFormValues } from '@models/post.model';

interface PostsCardsProps {
  posts: PostFormValues[];
}

function PostsCards({ posts = [] }: PostsCardsProps) {
  return (
    <Grid container spacing={3} alignItems="stretch">
      {posts?.length === 0 && <h1>No Posts</h1>}
      {posts?.length > 0 && posts.map((post: PostFormValues) => (
        <Grid item xs={12} sm={6} md={4} key={post?.id} sx={{ display: 'flex', height: '100%' }}>
          <PostCard {...post} cardSx={{ height: '100%', minHeight: 150, flex: 1 }} />
        </Grid>
      ))}
    </Grid>
  );
}

export default PostsCards;

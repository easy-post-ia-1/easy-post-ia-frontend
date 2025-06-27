import { Box } from '@mui/material';
import PostCard from './PostCard';
import { PostFormValues } from '@models/post.model';

interface PostsCardsProps {
  posts: PostFormValues[];
}

function PostsCards({ posts = [] }: PostsCardsProps) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      sx={{ flexWrap: 'wrap', gap: '30px', justifyContent: { xs: 'center', sm: 'inherit' } }}
    >
      {posts?.length === 0 && <h1>No Posts</h1>}
      {posts?.length > 0 && posts.map((post: PostFormValues) => <PostCard key={post?.id} {...post} />)}
    </Box>
  );
}

export default PostsCards;

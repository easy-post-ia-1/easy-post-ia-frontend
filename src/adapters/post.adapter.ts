import { PostFormValues, PostShowEndpoint } from '@models/post.model';
import { DateTime } from 'luxon';

export const createPostAdapter = (post: PostShowEndpoint): PostFormValues => ({
  id: post.id,
  title: post.title,
  description: post.description,
  imageUrl: post.image_url,
  tags: post.tags,
  category: post.category || '',
  emoji: post.emoji || '',
  programmingDateToPost: DateTime.fromISO(post.programming_date_to_post),
  isPublished: post.is_published ?? false,
});

export const uploadPostAdapter = (post: PostFormValues): PostShowEndpoint => ({
  id: post.id,
  title: post.title,
  description: post.description,
  image_url: post.imageUrl,
  tags: post.tags,
  category: post.category,
  emoji: post.emoji,
  programming_date_to_post: post.programmingDateToPost?.toISO() || new Date().toISOString(),
  is_published: post.isPublished,
});

import { PostFormValues, PostSearch } from '@models/post.model';
import { DateTime } from 'luxon';

export const initialValuesPost: PostFormValues = {
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

export const initialValuesPostsQuery: PostSearch = {
  titlePost: '',
  description: '',
  tags: '',
  status: '',
  isPublished: '',
};

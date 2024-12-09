import { PostFormValues, PostSearch } from '@models/post.model';
import { DateTime } from 'luxon';

export const initialValuesPost: PostFormValues = {
  id: -1,
  title: '',
  description: '',
  imageUrl: '',
  tags: '',
  programmingDateToPost: DateTime.now(),
  isPublished: true,
};

export const initialValuesPostsQuery: PostSearch = {
  titlePost: '',
  yearCreated: '',
};

import type { DateTime } from 'luxon';

export interface PostFormValues {
  id?: number;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string;
  programmingDateToPost: DateTime<boolean> | null | undefined;
  isPublished: boolean;
}

export interface PostShowEndpoint {
  id?: number;
  title: string;
  description: string;
  image_url?: string;
  tags: string;
  programming_date_to_post: string;
  is_published: boolean;
}

export interface PostSearch {
  titlePost: string;
  yearCreated: string;
}

export interface PostFabOptionsProps {
  id: number;
  valuesForm: PostFormValues;
  handleErrorFormat: (errorFormat: PostFormValues) => void;
}

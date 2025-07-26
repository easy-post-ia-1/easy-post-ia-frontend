import type { DateTime } from 'luxon';
import { FetchedStrategy } from './strategy.model';

export interface PostFormValues {
  id?: number;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string;
  category: string;
  emoji: string;
  programmingDateToPost: DateTime<boolean> | null | undefined;
  isPublished: boolean;
}

export interface PostShowEndpoint {
  id?: number;
  title: string;
  description: string;
  image_url?: string;
  tags: string;
  category?: string;
  emoji?: string;
  programming_date_to_post: string;
  is_published: boolean;
}

export interface PostSearch {
  titlePost?: string;
  description?: string;
  tags?: string;
  status?: string;
  isPublished?: string;
}

export interface PostFabOptionsProps {
  id: number;
  valuesForm: PostFormValues;
  handleErrorFormat: (errorFormat: PostFormValues) => void;
  onTemplateSelect?: (template: any) => void;
}

export interface PostFabPublishSaveDelProps {
  valuesForm: PostFormValues;
  id: number;
  handleErrorFormat: (errorFormat: PostFormValues) => void;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  status: number;
  programming_date_to_post: string;
  is_published: boolean;
  tags: string;
  category: string;
  emoji: string;
  strategy?: FetchedStrategy;
  error_response?: string;
  success_response?: string;
  created_at: string;
  updated_at: string;
  status_display?: PostStatusDisplay;
}

export interface PostStatusDisplay {
  name: string;
  color: string;
  key: string;
}

export const initialValuesPostsQuery: PostSearch = {
  titlePost: '',
  description: '',
  tags: '',
  status: '',
  isPublished: ''
};

// Post status constants
export const POST_STATUS = {
  PENDING: {
    key: 'pending',
    name: 'Pending',
    color: '#FFA500' // Orange
  },
  PUBLISHING: {
    key: 'publishing',
    name: 'Publishing',
    color: '#ADD8E6' // Light Blue
  },
  PUBLISHED: {
    key: 'published',
    name: 'Published',
    color: '#90EE90' // Light Green
  },
  FAILED_IMAGE: {
    key: 'failed_image',
    name: 'Image Upload Failed',
    color: '#FF6B6B' // Red
  },
  FAILED_PUBLISH: {
    key: 'failed_publish',
    name: 'Publication Failed',
    color: '#FF6B6B' // Red
  },
  FAILED_NETWORK: {
    key: 'failed_network',
    name: 'Network Error',
    color: '#FF6B6B' // Red
  },
  FAILED_AUTH: {
    key: 'failed_auth',
    name: 'Authentication Failed',
    color: '#FF6B6B' // Red
  },
  CANCELLED: {
    key: 'cancelled',
    name: 'Cancelled',
    color: '#F08080' // Light Coral
  },
  DRAFT: {
    key: 'draft',
    name: 'Draft',
    color: '#A9A9A9' // Dark Grey
  },
  SCHEDULED: {
    key: 'scheduled',
    name: 'Scheduled',
    color: '#ADD8E6' // Light Blue
  }
} as const;

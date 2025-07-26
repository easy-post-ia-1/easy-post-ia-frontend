import { useQuery } from '@tanstack/react-query';
import { postsService } from '@services/posts.service';
import useAlertNotification from '../../../hooks/shared/useAlertNotification';
import { Post } from '@models/post.model';

export interface PostsResponse {
  status: {
    code: number;
    message: string;
  };
  posts: Post[];
  pagination: {
    page: number;
    pages: number;
    count: number;
  };
}

export interface PostResponse {
  status: {
    code: number;
    message: string;
  };
  post: Post;
}

interface PostsFilters {
  from_date?: string;
  to_date?: string;
  page?: number;
  page_size?: number;
  title?: string;
  description?: string;
  tags?: string;
  status?: string;
  is_published?: boolean;
}

const removeUndefinedValues = (obj: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined && value !== '')
  );
};

export const usePosts = (filters?: PostsFilters) => {
  const enqueueAlertNotification = useAlertNotification();

  return useQuery<PostsResponse>({
    queryKey: ['posts', filters],
    queryFn: async () => {
      try {
        const cleanFilters = filters ? removeUndefinedValues(filters) : {};
        const response = await postsService.index({ params: cleanFilters }).call;
        return response.data;
      } catch (error) {
        enqueueAlertNotification('Failed to fetch posts', 'error');
        throw error;
      }
    },
  });
};

export const usePostShow = (id: number) => {
  const enqueueAlertNotification = useAlertNotification();

  return useQuery<PostResponse>({
    queryKey: ['post', id],
    queryFn: async () => {
      try {
        const response = await postsService.show({ id }).call;
        return response.data;
      } catch (error) {
        enqueueAlertNotification('Failed to fetch post', 'error');
        throw error;
      }
    },
    enabled: !!id && id !== -1,
  });
};

import { Post } from '@models/post.model';
import { apiClient } from '@utils/axios-utilities';

const POST_SERVICE = 'posts';

interface GetPostsParams {
  from_date?: string; // ISO 8601 date string
  to_date?: string;   // ISO 8601 date string
  page?: number;
  page_size?: number;
  title?: string;     // Search by title
  description?: string; // Search by description
  tags?: string;      // Search by tags
  status?: string;    // Filter by status
  is_published?: boolean; // Filter by published status
}

interface PostsResponse {
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

const getIndex = async (params: GetPostsParams = {}): Promise<PostsResponse> => {
  const queryString = new URLSearchParams(params as Record<string, string>).toString();
  const response = await apiClient().get(`/v1/${POST_SERVICE}?${queryString}`);
  return response.data;
};

const getShow = async (id: number): Promise<PostsResponse> => {
  const response = await apiClient().get(`/v1/${POST_SERVICE}/${id}`);
  return response.data;
};

const createPost = async (data: Partial<Post>): Promise<PostsResponse> => {
  const response = await apiClient().post(`/v1/${POST_SERVICE}`, data);
  return response.data;
};

const updatePost = async (id: number, data: Partial<Post>): Promise<PostsResponse> => {
  const response = await apiClient().put(`/v1/${POST_SERVICE}/${id}`, data);
  return response.data;
};

const destroyPost = async (id: number): Promise<PostsResponse> => {
  const response = await apiClient().delete(`/v1/${POST_SERVICE}/${id}`);
  return response.data;
};

const getCalendarPosts = async ({ from_date, to_date, page = 1, page_size = 10 }: GetPostsParams): Promise<PostsResponse> => {
  const response = await apiClient().get(`/v1/${POST_SERVICE}`, {
    params: {
      from_date,
      to_date,
      page,
      page_size
    }
  });
  return response.data;
};

export const postsService = {
  index: getIndex,
  show: getShow,
  create: createPost,
  update: updatePost,
  destroy: destroyPost,
  getCalendarPosts,
};

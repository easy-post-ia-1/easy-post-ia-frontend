import { Post } from '@models/post.model';
import { ParamsAxios, ResponseAxiosService } from '@models/api.model';
import { apiClient } from '@utils/axios-utilities';
import { POSTS_SERVICE, CURR_API_VERSION } from '@utils/constants/api.constants';

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

const getIndex = ({ configService = { version: CURR_API_VERSION }, params = {} }: ParamsAxios & { params?: GetPostsParams } = {}): ResponseAxiosService => {
  const queryString = new URLSearchParams(params as Record<string, string>).toString();
  return {
    call: apiClient().get(`/${configService?.version}/${POSTS_SERVICE}?${queryString}`),
  };
};

const getShow = ({ configService = { version: CURR_API_VERSION }, id }: ParamsAxios & { id: number }): ResponseAxiosService => {
  return {
    call: apiClient().get(`/${configService?.version}/${POSTS_SERVICE}/${id}`),
  };
};

const createPost = ({ configService = { version: CURR_API_VERSION }, data }: ParamsAxios & { data: Partial<Post> }): ResponseAxiosService => {
  return {
    call: apiClient().post(`/${configService?.version}/${POSTS_SERVICE}`, data),
  };
};

const updatePost = ({ configService = { version: CURR_API_VERSION }, id, data }: ParamsAxios & { id: number; data: Partial<Post> }): ResponseAxiosService => {
  return {
    call: apiClient().put(`/${configService?.version}/${POSTS_SERVICE}/${id}`, data),
  };
};

const destroyPost = ({ configService = { version: CURR_API_VERSION }, id }: ParamsAxios & { id: number }): ResponseAxiosService => {
  return {
    call: apiClient().delete(`/${configService?.version}/${POSTS_SERVICE}/${id}`),
  };
};

const getCalendarPosts = ({ configService = { version: CURR_API_VERSION }, params }: ParamsAxios & { params: GetPostsParams }): ResponseAxiosService => {
  return {
    call: apiClient().get(`/${configService?.version}/${POSTS_SERVICE}`, { params }),
  };
};

export const postsService = {
  index: getIndex,
  show: getShow,
  create: createPost,
  update: updatePost,
  destroy: destroyPost,
  getCalendarPosts,
};

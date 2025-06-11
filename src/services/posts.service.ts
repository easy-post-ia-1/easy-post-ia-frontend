import { ParamsAxios, ResponseAxiosService } from '@models/api.model';
import { apiClient } from '@utils/axios-utilities';
import { Post } from '@models/post.model';

const POST_SERVICE = 'posts';

interface GetCalendarPostsParams {
  from_date: string; // ISO 8601 date string
  to_date: string;   // ISO 8601 date string
  page?: number;
  perPage?: number;
}

interface PostsResponse {
  posts: Post[];
  pagination: {
    page: number;
    pages: number;
    count: number;
  };
}

const getIndex = ({ data, configService = { version: 'v1' } }: ParamsAxios = {}): ResponseAxiosService => {
  const queryString = new URLSearchParams(data as Record<string, string>).toString();
  return {
    call: apiClient().get(`/${configService?.version}/${POST_SERVICE}?${queryString}`),
  };
};

const getShow = ({ data = {}, configService = { version: 'v1' } }: ParamsAxios = {}): ResponseAxiosService => {
  return {
    call: apiClient().get(`/${configService?.version}/${POST_SERVICE}/${data?.id}`),
  };
};

const createPost = ({ data, configService = { version: 'v1' } }: ParamsAxios = {}): ResponseAxiosService => {
  return {
    call: apiClient().post(`/${configService?.version}/${POST_SERVICE}`, data),
  };
};

const updatePost = ({ data, configService = { version: 'v1' } }: ParamsAxios = {}): ResponseAxiosService => {
  return {
    call: apiClient().put(`/${configService?.version}/${POST_SERVICE}/${data?.id}`, data),
  };
};

const destroyPost = ({ data, configService = { version: 'v1' } }: ParamsAxios = {}): ResponseAxiosService => {
  return {
    call: apiClient().delete(`/${configService?.version}/${POST_SERVICE}/${data?.id}`),
  };
};

const getCalendarPosts = async ({ from_date, to_date, page = 1, perPage = 10 }: GetCalendarPostsParams): Promise<PostsResponse> => {
  const response = await apiClient().get(`/v1/${POST_SERVICE}` ,{
    params: {
      from_date,
      to_date,
      page,
      per_page: perPage
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

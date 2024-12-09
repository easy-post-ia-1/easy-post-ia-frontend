import { ParamsAxios, ResponseAxiosService } from '@models/api.model';
import { apiClient } from '@utils/axios-utilities';

const POST_SERVICE = 'posts';

const getIndex = ({ configService = { version: 'v1' } }: ParamsAxios = {}): ResponseAxiosService => {
  return {
    call: apiClient().get(`/${configService?.version}/${POST_SERVICE}`),
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

export const postsService = {
  index: getIndex,
  show: getShow,
  create: createPost,
  update: updatePost,
  destroy: destroyPost,
};

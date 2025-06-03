import { ParamsAxios, ResponseAxiosService } from '@models/index';
import { apiClient } from '@utils/axios-utilities';
import { USER_SERVICE } from '@utils/constants';

const getHealthCheck = async ({ configService = { version: 'v1' } }: ParamsAxios = {}) => {
  try {
    const res = await apiClient().get(`/${configService?.version}/${USER_SERVICE}/healthcheck`);
    return res.data;
  } catch {
    return await Promise.reject('Fallo: ');
  }
};

const postLogin = ({ configService = { version: 'v1' }, data = {} }: ParamsAxios): ResponseAxiosService => {
  return {
    call: apiClient().post(`/${configService?.version}/${USER_SERVICE}/login`, { user: data }),
  };
};

const getCompanySocialStatus = ({ configService = { version: 'v1' } }: ParamsAxios = {}): ResponseAxiosService => {
  return {
    call: apiClient().get(`/${configService?.version}/${USER_SERVICE}/me/company_social_status`),
  };
};

const getUser = ({ configService = { version: 'v1' } }: ParamsAxios = {}): ResponseAxiosService => {
  return {
    call: apiClient().get(`/${configService?.version}/${USER_SERVICE}/me`),
  };
};

const postSignUp = ({ configService = { version: 'v1' }, data = {} }: ParamsAxios): ResponseAxiosService => {
  return {
    call: apiClient().post(`/${configService?.version}/${USER_SERVICE}/signup`, data),
  };
};

const deleteLogout = ({ configService = { version: 'v1' } }: ParamsAxios): ResponseAxiosService => {
  return {
    call: apiClient().delete(`/${configService?.version}/${USER_SERVICE}/logout`),
  };
};

export const userService = {
  getHealthCheck,
  postLogin,
  getUser,
  deleteLogout,
  postSignUp,
  getCompanySocialStatus,
};

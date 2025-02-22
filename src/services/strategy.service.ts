import { ParamsAxios, ResponseAxiosService } from '@models/api.model';
import { apiClient } from '@utils/axios-utilities';
import { USER_SERVICE } from '@utils/constants';

const postCreateStrategy = ({ configService = { version: 'v1' }, data = {} }: ParamsAxios): ResponseAxiosService => {
  return {
    call: apiClient().post(`/${configService?.version}/${USER_SERVICE}/create-strategy`, { user: data }),
  };
};

export const strategyService = {
  postCreateStrategy,
};

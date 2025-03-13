import { ParamsAxios, ResponseAxiosService } from '@models/api.model';
import { apiClient } from '@utils/axios-utilities';
import { STRATEGY_SERVICE } from '@utils/constants';

const postCreateStrategy = ({ configService = { version: 'v1' }, data = {} }: ParamsAxios): ResponseAxiosService => {
  return {
    call: apiClient().post(`/${configService?.version}/${STRATEGY_SERVICE}/create`, { ...data }),
  };
};

export const strategyService = {
  postCreateStrategy,
};

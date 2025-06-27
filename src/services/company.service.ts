import { ParamsAxios, ResponseAxiosService } from '@models/index';
import { apiClient } from '@utils/axios-utilities';
import { COMPANY_SERVICE } from '@utils/constants/api.constants';

const getCompanySocialStatus = ({ configService = { version: 'v1' } }: ParamsAxios = {}): ResponseAxiosService => {
  return {
    call: apiClient().get(`/${configService?.version}/${COMPANY_SERVICE}/company_social_status/me`),
  };
};

const getCompany = ({ configService = { version: 'v1' }, id }: ParamsAxios & { id: string }): ResponseAxiosService => {
  return {
    call: apiClient().get(`/${configService?.version}/${COMPANY_SERVICE}/${id}`),
  };
};

export const companyService = {
  getCompanySocialStatus,
  getCompany,
}; 
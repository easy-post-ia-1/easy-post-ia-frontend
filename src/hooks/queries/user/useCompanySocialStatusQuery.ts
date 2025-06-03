import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { userService } from '@services/user.service';
import { AdaptedCompanySocialStatus, CompanySocialStatusResponseUpdated } from '@models/social.model';
import { USER_QUERY_KEYS } from '@utils/constants/user.constants';
import { Error } from '@models/error.model';
import { createCompanySocialStatusAdapter } from '@adapters/social.adapter';

export const useCompanySocialStatus = (): UseQueryResult<AdaptedCompanySocialStatus, Error> => {
  return useQuery<AdaptedCompanySocialStatus, Error, AdaptedCompanySocialStatus, string[]>({
    queryKey: [USER_QUERY_KEYS.COMPANY_SOCIAL_STATUS],
    queryFn: async () => {
      const response = await userService.getCompanySocialStatus().call;
      const rawData = response.data as CompanySocialStatusResponseUpdated;
      return createCompanySocialStatusAdapter(rawData);
    },
    // Add any default options like staleTime, cacheTime if common in the project
  });
};

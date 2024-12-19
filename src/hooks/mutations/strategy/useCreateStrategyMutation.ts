import { useMutation } from '@tanstack/react-query';
import { strategyService } from '@services/strategy.service';
import useHandleAlertNotification from '@hooks/shared/useAlertNotification';

import { StrategyValues } from '@models/strategy.model'; // Define this model
import { ErrorSignUp } from '@models/error.model';
import { Data, ParamsAxios } from '@models/api.model';

// FIX: Interface ErrorSignup must has a general name
export const createStrategyMutation = () => {
  const enqueueAlertNotification = useHandleAlertNotification();

  return useMutation({
    // Mutation function: Sends the POST request to create the strategy
    mutationFn: (strategyInput: StrategyValues) => {
      const data: ParamsAxios = { data: { ...strategyInput } as Data };
      return strategyService.postCreateStrategy(data).call;
    },

    // Called when the request succeeds
    onSuccess: ({ data }) => {
      if (data?.error?.length > 0) {
        enqueueAlertNotification(`${data.status.message}`, 'error');
        return;
      }
      enqueueAlertNotification(data.status.message, 'success');
    },

    // Called when the request fails
    onError: (error: ErrorSignUp) => {
      enqueueAlertNotification(`${error?.['response']?.data?.status?.message}`, 'error');
    },
  });
};

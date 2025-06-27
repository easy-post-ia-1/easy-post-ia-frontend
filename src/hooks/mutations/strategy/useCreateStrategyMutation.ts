import { useMutation } from '@tanstack/react-query';
import { strategyService } from '@services/strategy.service';
import useHandleAlertNotification from '@hooks/shared/useAlertNotification';

import { StrategyEndpoint } from '@models/strategy.model';
import { ErrorSignUp } from '@models/error.model';

export const createStrategyMutation = () => {
  const enqueueAlertNotification = useHandleAlertNotification();

  return useMutation({
    // Mutation function: Sends the POST request to create the strategy
    mutationFn: (strategyInput: StrategyEndpoint) => {
      return strategyService.createStrategy(strategyInput);
    },

    // Called when the request succeeds
    onSuccess: (data) => {
      enqueueAlertNotification(data.status.message, 'success');
    },

    // Called when the request fails
    onError: (error: ErrorSignUp) => {
      enqueueAlertNotification(`${error?.['response']?.data?.status?.message}`, 'error');
    },
  });
};

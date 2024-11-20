import { useSnackbar, VariantType } from 'notistack';

function useHandleAlertNotification() {
  const { enqueueSnackbar } = useSnackbar();

  const enqueueAlertNotification = (msg: string = '', severity: VariantType) => {
    enqueueSnackbar(msg, {
      variant: severity,
    });
  };

  return enqueueAlertNotification;
}

export default useHandleAlertNotification;

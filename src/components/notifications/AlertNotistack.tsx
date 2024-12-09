import { forwardRef, useCallback } from 'react';
import { ClickAwayListener, IconButton, Typography } from '@mui/material';
import { useSnackbar, SnackbarContent } from 'notistack';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Alert } from '@mui/material';

interface AlertNotificationProps {
  id?: string;
  message?: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
}

const AlertNotistack = forwardRef<HTMLDivElement, AlertNotificationProps>((props, ref) => {
  const { closeSnackbar } = useSnackbar();
  const { id, message, variant: severity = 'success' } = props;

  const handleDismiss = useCallback(() => closeSnackbar(id), [id, closeSnackbar]);
  const handleClickAway = useCallback(() => closeSnackbar(id), [id, closeSnackbar]);

  return (
    <SnackbarContent ref={ref} role={severity} style={{ justifyContent: 'center', alignItems: 'center' }}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Alert
          id={`local-notification-${id}`}
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              style={{ display: 'flex', alignSelf: 'center' }}
              onClick={handleDismiss}
            >
              <CloseRoundedIcon />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <Typography variant="caption">{message}</Typography>
        </Alert>
      </ClickAwayListener>
    </SnackbarContent>
  );
});

export default AlertNotistack;

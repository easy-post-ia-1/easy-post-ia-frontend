import { useState, ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, Divider, FormHelperText, Stack, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useNavigate } from 'react-router-dom';
import { userCreateSessionMutation } from '@hooks/mutations/user';
import { loginSchema } from '@utils/validations/get_started';
import { groupErrorMessages } from '@utils/errors';
import CircularProgressBtnLoading from '@components/loading/CircularProgressBtnLoading';
import { Error, LoginFormErrorValues } from '@models/error.model';
import ErrorFormHelperText from './ErrorFormHelperText';
import { initialValuesLogin } from '@utils/constants';
import useLoginGoogle from '@hooks/shared/useLoginGoogle';
import useLoginFacebook from '@hooks/shared/useLoginFacebook';
import FacebookLoginButton from '@kazion/react-facebook-login';

function LoginForm() {
  const { t } = useTranslation();
  const [nickname, setNickname] = useState<string>('');
  const [passwd, setPasswd] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [disabledLogin, setDisabledLogin] = useState(false);
  const navigate = useNavigate();
  const mutation = userCreateSessionMutation();
  const [errorsForm, setErrorsForm] = useState<LoginFormErrorValues>(initialValuesLogin);
  const { loginFacebook } = useLoginFacebook();
  const { loginGoogle } = useLoginGoogle();

  const handleClickShowPassword = () => setShowPassword((show: boolean) => !show);

  const handleClickLogin = (username: string, password: string) => {
    setDisabledLogin(true);

    const { success = false, error = null } = loginSchema.safeParse({ username, password });

    if (success) {
      mutation.mutate({ username, password });
      setDisabledLogin(false);

      return;
    }

    const formatErrors =
      error?.issues
        ?.map(({ message, path }: Error) => ({ message, path }))
        .filter((error): error is { message: string; path: string[] } => error !== undefined) || [];

    const loginErrors = groupErrorMessages(formatErrors);
    setErrorsForm(loginErrors as unknown as LoginFormErrorValues);

    setDisabledLogin(false);
  };

  useEffect(() => {
    if (mutation?.isSuccess) {
      navigate('/');
    }
  }, [mutation?.isSuccess]);

  return (
    <Stack sx={{ mt: 6 }}>
      <Typography variant="h6">{`${t('login.btn_login')} / ${t('login.btn_signup')}`}</Typography>
      <Typography variant="caption">{t('login.started')}</Typography>

      <Box mt={2} />
      <FormControl error={errorsForm?.nickname?.length > 0} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-username">{t('form.username')}</InputLabel>
        <OutlinedInput
          id="outlined-adornment-username"
          type="text"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
          label={t('form.username')}
          value={nickname}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setNickname(event.target.value)}
        />
        <FormHelperText id="select-usertype-helper-text">
          <ErrorFormHelperText text={errorsForm?.nickname} />
        </FormHelperText>
      </FormControl>

      <Box mt={4} />
      <FormControl error={errorsForm?.passwd?.length > 0} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">{t('form.password')}</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label={t('form.password')}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setPasswd(event.target.value)}
          value={passwd}
        />
        <FormHelperText id="outlined-error-password">
          <ErrorFormHelperText text={errorsForm?.passwd} />
        </FormHelperText>
      </FormControl>

      <Box mt={4} />
      <Button
        variant="contained"
        disabled={disabledLogin}
        size="large"
        onClick={() => handleClickLogin(nickname, passwd)}
      >
        {mutation?.isPending && !mutation?.isError ? <CircularProgressBtnLoading /> : t('login.btn_login')}
      </Button>

      <Box mt={2} />
      <Button variant="contained" size="large" color="secondary" onClick={() => navigate('/signup')}>
        {t('login.btn_signup')}
      </Button>

      <Box mt={4} />
      <Divider>{t('login.divider')}</Divider>

      <Box mt={6} />
      <Button
        style={{ backgroundColor: '#1877F2' }}
        startIcon={<FacebookIcon style={{ fill: 'white' }} />}
        variant="contained"
        size="large"
        onClick={() => loginFacebook()}
      >
        {t('form.btn_connect', { socialNetwork: 'Facebook' })}
      </Button>

      <FacebookLoginButton
        appId={configEnv.VITE_FACEBOOK_APP_ID_WEB}
        onSuccess={(response) => {
          console.log('Login Success!', response);
        }}
        onFail={(error) => {
          console.log('Login Failed!', error);
        }}
        onProfileSuccess={(response) => {
          console.log('Get Profile Success!', response);
        }}
      />

      <Box mt={2} />
      <Button
        style={{ backgroundColor: 'white', color: 'black' }}
        startIcon={<GoogleIcon style={{ fill: 'black' }} />}
        variant="contained"
        size="large"
        onClick={() => loginGoogle()}
      >
        {t('form.btn_connect', { socialNetwork: 'Google' })}
      </Button>
    </Stack>
  );
}

export default LoginForm;

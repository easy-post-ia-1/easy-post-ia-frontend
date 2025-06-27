import { useEffect, useState } from 'react';
import useForm from '@hooks/shared/useForm';
import { AccountCircle, Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BadgeIcon from '@mui/icons-material/Badge';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { groupErrorMessages } from '@utils/errors';
import { UserSignUp } from '@models/user.model';
import { signupSchema } from '@utils/validations/get_started';
import { Error } from '@models/error.model';
import ErrorFormHelperText from './ErrorFormHelperText';
import { userCreateSignUpMutation } from '@hooks/mutations/user/userCreateSignUpMutation';
import CircularProgressBtnLoading from '@components/loading/CircularProgressBtnLoading';
import { useNavigate } from 'react-router-dom';
import { initialValuesSignUp } from '@utils/constants/user.constants';

const SignUpForm = () => {
  const [errorsForm, setErrorsForm] = useState(initialValuesSignUp);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [disabledSignUp, setDisabledSignUp] = useState(false);
  const mutation = userCreateSignUpMutation();

  const { valuesForm, handleInputChange } = useForm(initialValuesSignUp);
  const { username = '', email = '', password = '', confirmPasswd = '', role = 'EMPLOYER' } = valuesForm;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show: boolean) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show: boolean) => !show);
  const handleBack = () => navigate(-1);

  const uploadFormSignUp = () => {
    setDisabledSignUp(true);
    const newUser = { username, email, password, role } as UserSignUp;
    const { success = false, error = null } = signupSchema.safeParse({ ...newUser, confirmPasswd });
    if (success) {
      mutation.mutate(newUser);
      setDisabledSignUp(false);

      return;
    }

    const formatErrors =
      error?.issues
        ?.map(({ message, path }: Error) => ({ message, path }))
        .filter((error): error is { message: string; path: string[] } => error !== undefined) || [];

    // Send notification error with hook and function
    setErrorsForm(groupErrorMessages(formatErrors) as unknown as UserSignUp);
    setDisabledSignUp(false);
  };

  useEffect(() => {
    if (mutation?.isSuccess) {
      navigate('/home');
    }
  }, [mutation?.isSuccess]);

  return (
    <Stack sx={{ mt: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={handleBack} sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6">{t('login.btn_signup')}</Typography>
      </Box>
      <Typography variant="caption">{t('login.started')}</Typography>

      <FormControl error={errorsForm?.username?.length > 0} sx={{ mt: 2 }} variant="outlined">
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
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
          inputProps={{ name: 'username' }}
        />
        <FormHelperText id="select-usertype-helper-text">
          <ErrorFormHelperText text={errorsForm?.username} />
        </FormHelperText>
      </FormControl>

      <FormControl error={errorsForm?.password?.length > 0} sx={{ mt: 4 }} variant="outlined">
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
          value={password}
          inputProps={{ name: 'password' }}
        />
        <FormHelperText id="outlined-error-password">
          <ErrorFormHelperText text={errorsForm?.password} />
        </FormHelperText>
      </FormControl>

      <FormControl
        error={errorsForm?.confirmPasswd != undefined && errorsForm?.confirmPasswd?.length > 0}
        sx={{ mt: 4 }}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-confirm-password">{t('form.confirm_passwd')}</InputLabel>
        <OutlinedInput
          id="outlined-adornment-confirm-password"
          type={showConfirmPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={handleClickShowConfirmPassword} edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label={t('form.password')}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
          value={confirmPasswd}
          inputProps={{ name: 'confirmPasswd' }}
        />
        <FormHelperText id="select-confirmPasswd-helper-text">
          <ErrorFormHelperText text={errorsForm?.confirmPasswd} />
        </FormHelperText>
      </FormControl>

      <FormControl error={errorsForm?.email?.length > 0} sx={{ mt: 4 }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-email">{t('form.email')}</InputLabel>
        <OutlinedInput
          id="outlined-adornment-email"
          type="text"
          startAdornment={
            <InputAdornment position="start">
              <MailOutlinedIcon />
            </InputAdornment>
          }
          label={t('form.email')}
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
          inputProps={{ name: 'email' }}
        />
        <FormHelperText id="select-email-helper-text">
          <ErrorFormHelperText text={errorsForm?.email} />
        </FormHelperText>
      </FormControl>

      <FormControl error={errorsForm?.role?.length > 0} sx={{ my: 4 }}>
        <InputLabel id="select-type-user-label">{t('form.type.user')}</InputLabel>
        <Select
          labelId="select-type-user-label"
          id="select-type-user"
          value={role as string}
          onChange={(e: SelectChangeEvent) => handleInputChange(e as unknown as ChangeEvent<HTMLInputElement>)}
          autoWidth
          label={t('form.type.user')}
          aria-describedby="select-usertype-helper-text"
          inputProps={{ name: 'role' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="EMPLOYEE">{t('type.user.employee')}</MenuItem>
          <MenuItem value="EMPLOYER">{t('type.user.employer')}</MenuItem>
          <MenuItem value="ADMIN">{t('type.user.admin')}</MenuItem>
        </Select>

        <FormHelperText id="select-usertype-helper-text">
          <ErrorFormHelperText text={errorsForm?.role} />

          <Box mt={2}>
            <Box display="flex" flexDirection="column">
              <Box display="flex" alignItems="center" mb={1}>
                <BadgeIcon />
                <p style={{ margin: 0, marginLeft: 8 }}>
                  <strong>{t('type.user.employee')}:</strong>
                  {t('type.user.info.employee')}.
                </p>
              </Box>

              <Box display="flex" alignItems="center" mb={1}>
                <SupervisorAccountIcon />
                <p style={{ margin: 0, marginLeft: 8 }}>
                  <strong>{t('type.user.employer')}:</strong>
                  {t('type.user.info.employer')}.
                </p>
              </Box>

              <Box display="flex" alignItems="center">
                <AdminPanelSettingsIcon />
                <p style={{ margin: 0, marginLeft: 8 }}>
                  <strong>{t('type.user.admin')}:</strong>
                  {t('type.user.info.admin')}.
                </p>
              </Box>
            </Box>
          </Box>
        </FormHelperText>
      </FormControl>

      <Button id="submit-signup" variant="contained" size="large" disabled={disabledSignUp} onClick={uploadFormSignUp}>
        {mutation?.isPending && !mutation?.isError ? <CircularProgressBtnLoading /> : t('form.btn.continue')}
      </Button>
    </Stack>
  );
};

export default SignUpForm;

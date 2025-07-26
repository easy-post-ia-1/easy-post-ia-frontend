import { LoginFormErrorValues } from '@models/error.model';
import { UserSignUp } from '@models/user.model';

export const initialValuesSignUp: UserSignUp = {
  username: '',
  email: '',
  password: '',
  confirmPasswd: '',
  role: 'EMPLOYER',
  company_code: '',
  team_code: '',
};

export const initialValuesLogin: LoginFormErrorValues = {
  nickname: '',
  passwd: '',
};

export const USER_QUERY_KEYS = {
  PROFILE: 'profile', // Example, if useGetAccount uses something like this
  COMPANY_SOCIAL_STATUS: 'companySocialStatus',
};

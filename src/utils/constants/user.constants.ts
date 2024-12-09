import { LoginFormErrorValues } from '@models/error.model';
import { UserSignUp } from '@models/user.model';

export const initialValuesSignUp: UserSignUp = {
  username: '',
  email: '',
  password: '',
  confirmPasswd: '',
  role: '',
};

export const initialValuesLogin: LoginFormErrorValues = {
  nickname: '',
  passwd: '',
};

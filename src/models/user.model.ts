import { signupSchema } from 'src/utils/validations/get_started/sign-up-form.validation';

export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  did_tutorial?: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserWithAuth extends User {
  role: string;
  isAuthenticated: boolean;
}

export interface UserFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type UserFormErrors = {
  [K in keyof UserFormValues]?: string;
};

export const userFormValidation = signupSchema;

export interface UserSignUp {
  username: string;
  email: string;
  password: string;
  role: string;
  company_code: string;
  team_code: string;
  team_name?: string;
  confirmPasswd?: string; // For frontend validation only, not sent to backend
}

export interface LoginInfo {
  username: string;
  password: string;
}

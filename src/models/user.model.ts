import { z } from '@i18n-zod/i18n-zod-setup.ts';
import { signupSchema } from 'src/utils/validations/get_started/sign-up-form.validation';

export type UserSignUp = z.infer<typeof signupSchema>;

export interface BasicInfoUser {
  email?: string | null;
  username?: string | null;
  role?: string | null;
}

interface AuthInfo {
  isAuthenticated?: boolean;
}

export interface LoginInfo {
  username: string;
  password: string;
}

export interface UserWithAuth extends BasicInfoUser, AuthInfo {}

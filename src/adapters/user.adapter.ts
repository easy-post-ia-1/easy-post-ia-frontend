import { UserWithAuth } from '@models/user.model.ts';

export const createUserAdapter = (data: UserWithAuth) => ({
  username: data.username,
  email: data?.email,
  role: data.role,
  isAuthenticated: data?.isAuthenticated,
});

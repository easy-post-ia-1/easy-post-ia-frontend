import { UserWithAuth } from '@models/user.model.ts';

export const createUserAdapter = (data: UserWithAuth) => ({
  id: data.id,
  username: data.username,
  email: data?.email,
  role: data.role,
  isAuthenticated: data?.isAuthenticated,
  first_name: data?.first_name,
  last_name: data?.last_name,
  did_tutorial: data?.did_tutorial,
  created_at: data?.created_at,
  updated_at: data?.updated_at,
});

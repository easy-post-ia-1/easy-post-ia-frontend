import { BasicInfoUser, UserWithAuth } from './user.model';

export interface UserStateZustand {
  user: UserWithAuth;
  login: (user: BasicInfoUser) => void;
  logout: () => void;
  updateUser: (userFields: BasicInfoUser) => void;
}

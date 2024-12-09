import { BasicInfoUser, UserWithAuth } from './user.model';

export interface UserStateZustand {
  user: UserWithAuth;
  login: (user: BasicInfoUser) => void;
  logout: () => void;
  updateUser: (userFields: BasicInfoUser) => void;
}

export interface BottomNavZustand {
  optionChosen: string;
  updateOptionChosen: (option: string) => void;
}

export interface AuthToken {
  token: string | null;
  updateToken: (newToken: string | null) => void;
  errorToken: string | null;
  updateErrorToken: (error: string | null) => void;
}

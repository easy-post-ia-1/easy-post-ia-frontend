import { UserWithAuth } from '@models/user.model.ts';
import { UserStateZustand } from '@models/zustand.model';
import { create, StateCreator } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

const initialState = {
  username: null,
  email: null,
  role: null,
  isAuthenticated: false,
};

// username(pin): "test17"
// email(pin): "test17@mail.com"
// role(pin): "EMPLOYEE"
// isAuthenticated(pin): true
//

const userApi: StateCreator<UserStateZustand> = (set, get) => ({
  user: initialState,
  login: (user: UserWithAuth) => set({ user: user }),
  logout: () => set({ user: initialState }),
  updateUser: (userFields: UserWithAuth) => set({ user: [get().user, userFields] as UserWithAuth }),
});

export const useUserStore = create<UserStateZustand>()(
  devtools(
    persist(userApi, {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    })
  )
);

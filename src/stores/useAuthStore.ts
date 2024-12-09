import { AuthToken } from '@models/zustand.model';
import { create, StateCreator } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

const tokenApi: StateCreator<AuthToken> = (set) => ({
  token: null,
  errorToken: null,
  updateToken: (newToken) => set({ token: newToken }),
  updateErrorToken: (error) => set({ errorToken: error }),
});

export const useAuthStore = create<AuthToken>()(
  devtools(
    persist(tokenApi, {
      name: 'auth-token-storage',
      storage: createJSONStorage(() => sessionStorage),
    })
  )
);

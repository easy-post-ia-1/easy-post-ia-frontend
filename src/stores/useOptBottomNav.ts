import { BottomNavZustand } from '@models/zustand.model';
import { create, StateCreator } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

const bottomNavApi: StateCreator<BottomNavZustand> = (set) => ({
  optionChosen: 'home',
  updateOptionChosen: (option: string) => set({ optionChosen: option }),
});

export const useOptBottomNav = create<BottomNavZustand>()(
  devtools(
    persist(bottomNavApi, {
      name: 'bottomNavApi-storage',
      storage: createJSONStorage(() => sessionStorage),
    })
  )
);

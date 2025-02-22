import { AccessibilityConfigZustand, ConfigValue, CountryType } from '@models/zustand.model';
import { create, StateCreator } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

const accessibilityConfigApi: StateCreator<AccessibilityConfigZustand> = (set) => ({
  darkMode: false,
  country: {
    code: 'US',
    label: 'United States',
    phone: '1',
    lang: 'en',
    suggested: true,
  },
  config: {},
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  updateCountry: (country: CountryType) => set({ country }),
  updateConfig: (option: ConfigValue) => set({ config: option }),
});

export const useAccesibilityConfig = create<AccessibilityConfigZustand>()(
  devtools(
    persist(accessibilityConfigApi, {
      name: 'accessibility-storage',
      storage: createJSONStorage(() => sessionStorage),
    })
  )
);

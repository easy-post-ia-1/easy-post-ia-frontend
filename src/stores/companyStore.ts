import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AdaptedCompanySocialStatus } from '@models/social.model';
import { createCompanySocialStatusAdapter } from '@adapters/social.adapter';

interface CompanyState {
  socialStatus: AdaptedCompanySocialStatus;
  isLoading: boolean;
  error: string | null;
}

interface CompanyActions {
  setSocialStatus: (data: any) => void; // Using any for raw API response
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState: CompanyState = {
  socialStatus: {
    networks: []
  },
  isLoading: false,
  error: null
};

const companyStore: StateCreator<CompanyState & CompanyActions> = (set) => ({
  ...initialState,
  
  setSocialStatus: (data) => {
    const adaptedData = createCompanySocialStatusAdapter(data);
    set({ socialStatus: adaptedData, error: null });
  },
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  reset: () => set(initialState)
});

export const useCompanyStore = create<CompanyState & CompanyActions>()(
  devtools(companyStore)
); 
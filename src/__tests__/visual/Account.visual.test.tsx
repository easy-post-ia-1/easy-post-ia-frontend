import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../_i18n/index';
import Account from '../../pages/Account';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Mock t function to return the key itself
  }),
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
  I18nextProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock AuthenticatedNavbar
vi.mock('@components/navbar/AuthenticatedNavbar', () => ({
  default: () => <div data-testid="mocked-navbar">Mocked Navbar</div>,
}));

// Mock BottomNavigationMobile
vi.mock('@components/navbar/BottomNavigationMobile', () => ({
  default: () => <div data-testid="mocked-bottom-nav">Mocked Bottom Nav</div>,
}));

// Mock useUserStore
vi.mock('@stores/userStore', () => ({
  useUserStore: () => ({
    logout: vi.fn(),
  }),
}));

// Mock useAuthStore
vi.mock('@stores/useAuthStore', () => ({
  useAuthStore: () => ({
    updateErrorToken: vi.fn(),
    updateToken: vi.fn(),
  }),
}));

// Mock capitalizeFirst helper
vi.mock('@utils/helpers', () => ({
  capitalizeFirst: (str: string) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '',
}));

// Mock useGetAccount hook
vi.mock('@hooks/queries/user/useProfileQuery', () => ({
  useGetAccount: () => ({
    data: { user: { id: 1, username: 'visual', email: 'visual@mail.com' } },
    isLoading: false,
    isError: false,
  }),
}));

// Mock useCompanySocialStatus hook
vi.mock('@hooks/queries/user/useCompanySocialStatusQuery', () => ({
  useCompanySocialStatus: () => ({
    data: { networks: [] },
    isLoading: false,
    isError: false,
    error: null,
  }),
}));

// Mock createUserAdapter
vi.mock('@adapters/user.adapter', () => ({
  createUserAdapter: (user: any) => ({
    ...user,
    role: 'employer',
  }),
}));

describe('Visual: Account snapshot', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n}>
            <Account />
          </I18nextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
}); 
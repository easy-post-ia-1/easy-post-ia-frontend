// src/__tests__/pages/Account.test.tsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../_i18n/index';
import Account from '../../pages/Account';
import { AdaptedCompanySocialStatus } from '../../models/social.model';
import { User } from '../../models/user.model';

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
  useGetAccount: vi.fn(),
}));

// Mock useCompanySocialStatus hook
vi.mock('@hooks/queries/user/useCompanySocialStatusQuery', () => ({
  useCompanySocialStatus: vi.fn(),
}));

// Mock createUserAdapter
vi.mock('@adapters/user.adapter', () => ({
  createUserAdapter: vi.fn(),
}));

// const mockSuccessStatusInstance: StatusSuccess = { code: 200, message: "Success" }; // No longer needed

describe('Account Component', () => {
  let queryClient: QueryClient;
  let mockUseGetAccount: any;
  let mockUseCompanySocialStatus: any;
  let mockCreateUserAdapter: any;

  beforeEach(async () => {
    vi.resetAllMocks();
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    // Get the mocked functions
    const { useGetAccount } = await import('@hooks/queries/user/useProfileQuery');
    const { useCompanySocialStatus } = await import('@hooks/queries/user/useCompanySocialStatusQuery');
    const { createUserAdapter } = await import('@adapters/user.adapter');
    
    mockUseGetAccount = useGetAccount;
    mockUseCompanySocialStatus = useCompanySocialStatus;
    mockCreateUserAdapter = createUserAdapter;

    // Set up default mocks
    mockUseGetAccount.mockReturnValue({
      data: {
        user: { id: 1, username: 'testuser', email: 'test@example.com' } as User
      },
      isLoading: false,
      isError: false,
    });
    mockCreateUserAdapter.mockImplementation((user: User) => user);
  });

  const renderAccount = () => {
    return render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n}>
            <Account />
          </I18nextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );
  };

  it('should display skeletons when social status is loading', () => {
    mockUseCompanySocialStatus.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
    });
    renderAccount();
    expect(screen.getByText('account.socialStatus.title')).toBeInTheDocument();
    // Check for Material-UI Skeleton components
    const skeletonElements = document.querySelectorAll('[class*="MuiSkeleton"]');
    expect(skeletonElements.length).toBeGreaterThanOrEqual(3);
  });

  it('should display specific error message if fetching social status fails and message exists', () => {
    mockUseCompanySocialStatus.mockReturnValue({
      data: null, isLoading: false, isError: true, error: { message: 'Custom API error' },
    });
    renderAccount();
    expect(screen.getByText('account.socialStatus.title')).toBeInTheDocument();
    expect(screen.getByText('Custom API error')).toBeInTheDocument();
  });

  it('should display default translated error message if fetching social status fails and no message exists', () => {
    mockUseCompanySocialStatus.mockReturnValue({
      data: null, isLoading: false, isError: true, error: { message: null },
    });
    renderAccount();
    expect(screen.getByText('account.socialStatus.title')).toBeInTheDocument();
    expect(screen.getByText('account.socialStatus.errorLoad')).toBeInTheDocument();
  });

  it('should display "account.socialStatus.noAccountsConfigured" when networks array is empty', () => {
    mockUseCompanySocialStatus.mockReturnValue({
      data: { networks: [] } as AdaptedCompanySocialStatus,
      isLoading: false,
      isError: false,
      error: null,
    });
    renderAccount();
    expect(screen.getByText('account.socialStatus.title')).toBeInTheDocument();
    expect(screen.getByText('account.socialStatus.noAccountsConfigured')).toBeInTheDocument();
  });

  it('should display "account.socialStatus.unavailable" when socialStatusData is null', () => {
    mockUseCompanySocialStatus.mockReturnValue({
      data: null, // Hook returns null
      isLoading: false,
      isError: false,
      error: null,
    });
    renderAccount();
    expect(screen.getByText('account.socialStatus.title')).toBeInTheDocument();
    expect(screen.getByText('account.socialStatus.unavailable')).toBeInTheDocument();
  });

  it('should display social network status correctly (Twitter with credentials)', () => {
    mockUseCompanySocialStatus.mockReturnValue({
      data: {
        networks: [{ name: 'Twitter', hasCredentials: true }],
      } as AdaptedCompanySocialStatus,
      isLoading: false,
      isError: false,
      error: null,
    });
    renderAccount();
    expect(screen.getByText('account.socialStatus.title')).toBeInTheDocument();
    const twitterCheckbox = screen.getByLabelText('Twitter'); // Label is 'Twitter' due to adapter
    expect(twitterCheckbox).toBeInTheDocument();
    expect(twitterCheckbox).toBeDisabled();
    expect(twitterCheckbox).toBeChecked();
  });

  it('should display social network status correctly (Twitter without credentials)', () => {
    mockUseCompanySocialStatus.mockReturnValue({
      data: {
        networks: [{ name: 'Twitter', hasCredentials: false }],
      } as AdaptedCompanySocialStatus,
      isLoading: false,
      isError: false,
      error: null,
    });
    renderAccount();
    expect(screen.getByText('account.socialStatus.title')).toBeInTheDocument();
    const twitterCheckbox = screen.getByLabelText('Twitter');
    expect(twitterCheckbox).toBeInTheDocument();
    expect(twitterCheckbox).toBeDisabled();
    expect(twitterCheckbox).not.toBeChecked();
  });

  it('should display basic user information correctly', () => {
    const specificUser = {
      id: 1,
      username: 'janedoe',
      email: 'jane@example.com',
      created_at: '',
      updated_at: ''
    } as User;
    mockUseGetAccount.mockReturnValue({
      data: { user: specificUser },
      isLoading: false,
      isError: false,
    });
    mockCreateUserAdapter.mockImplementationOnce((user: User) => ({ // mockImplementationOnce for specific test behavior
        id: user.id,
        username: `Adapted ${user.username}`, // Ensure this matches what you expect
        email: user.email,
        role: 'employer' // Mock the role since it's not in the User interface
    }));
    // Provide a default successful state for social status for this test too
    mockUseCompanySocialStatus.mockReturnValue({
      data: { networks: [] } as AdaptedCompanySocialStatus,
      isLoading: false,
      isError: false,
      error: null,
    });

    renderAccount();
    expect(screen.getByText('Adapted janedoe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('Employer')).toBeInTheDocument(); // capitalizeFirst should capitalize the role
  });
});

// src/__tests__/pages/Account.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Account from '../../../pages/Account';
import { AdaptedCompanySocialStatus } from '../../../models/social.model';
import { User } from '../../../models/user.model';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Mock t function to return the key itself
  }),
}));

// Mock AuthenticatedNavbar
vi.mock('../../../components/navbar/AuthenticatedNavbar', () => ({
  default: () => <div data-testid="mocked-navbar">Mocked Navbar</div>,
}));

// Mock useGetAccount hook
const mockUseGetAccountDefault = vi.fn();
vi.mock('../../../hooks/queries/user/useProfileQuery', () => ({
  useGetAccount: () => mockUseGetAccountDefault(),
}));

// Mock useCompanySocialStatus hook
const mockUseCompanySocialStatusDefault = vi.fn();
vi.mock('../../../hooks/queries/user/useCompanySocialStatusQuery', () => ({
  useCompanySocialStatus: () => mockUseCompanySocialStatusDefault(),
}));

// Mock createUserAdapter
const mockUserAdapterFn = vi.fn();
vi.mock('../../../adapters/user.adapter', () => ({
  createUserAdapter: mockUserAdapterFn,
}));

// const mockSuccessStatusInstance: StatusSuccess = { code: 200, message: "Success" }; // No longer needed

describe('Account Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    mockUseGetAccountDefault.mockReturnValue({
      data: {
        user: { id: '1', username: 'testuser', email: 'test@example.com' } as User
      },
      isLoading: false,
      isError: false,
    });
    mockUserAdapterFn.mockImplementation((user: User) => user);
  });

  it('should display skeletons when social status is loading', () => {
    mockUseCompanySocialStatusDefault.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
    });
    render(<Account />);
    expect(screen.getByText('account.socialStatus.title')).toBeInTheDocument();
    const skeletons = screen.getAllByRole('progressbar');
    expect(skeletons.length).toBeGreaterThanOrEqual(3);
  });

  it('should display specific error message if fetching social status fails and message exists', () => {
    mockUseCompanySocialStatusDefault.mockReturnValue({
      data: null, isLoading: false, isError: true, error: { message: 'Custom API error' },
    });
    render(<Account />);
    expect(screen.getByText('account.socialStatus.title')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Custom API error');
  });

  it('should display default translated error message if fetching social status fails and no message exists', () => {
    mockUseCompanySocialStatusDefault.mockReturnValue({
      data: null, isLoading: false, isError: true, error: { message: null },
    });
    render(<Account />);
    expect(screen.getByText('account.socialStatus.title')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('account.socialStatus.errorLoad');
  });

  it('should display "account.socialStatus.noAccountsConfigured" when networks array is empty', () => {
    mockUseCompanySocialStatusDefault.mockReturnValue({
      data: { networks: [] } as AdaptedCompanySocialStatus,
      isLoading: false,
      isError: false,
      error: null,
    });
    render(<Account />);
    expect(screen.getByText('account.socialStatus.title')).toBeInTheDocument();
    expect(screen.getByText('account.socialStatus.noAccountsConfigured')).toBeInTheDocument();
  });

  it('should display "account.socialStatus.unavailable" when socialStatusData is null', () => {
    mockUseCompanySocialStatusDefault.mockReturnValue({
      data: null, // Hook returns null
      isLoading: false,
      isError: false,
      error: null,
    });
    render(<Account />);
    expect(screen.getByText('account.socialStatus.title')).toBeInTheDocument();
    expect(screen.getByText('account.socialStatus.unavailable')).toBeInTheDocument();
  });

  it('should display social network status correctly (Twitter with credentials)', () => {
    mockUseCompanySocialStatusDefault.mockReturnValue({
      data: {
        networks: [{ name: 'Twitter', hasCredentials: true }],
      } as AdaptedCompanySocialStatus,
      isLoading: false,
      isError: false,
      error: null,
    });
    render(<Account />);
    expect(screen.getByText('account.socialStatus.title')).toBeInTheDocument();
    const twitterCheckbox = screen.getByLabelText('Twitter'); // Label is 'Twitter' due to adapter
    expect(twitterCheckbox).toBeInTheDocument();
    expect(twitterCheckbox).toBeDisabled();
    expect(twitterCheckbox).toBeChecked();
  });

  it('should display social network status correctly (Twitter without credentials)', () => {
    mockUseCompanySocialStatusDefault.mockReturnValue({
      data: {
        networks: [{ name: 'Twitter', hasCredentials: false }],
      } as AdaptedCompanySocialStatus,
      isLoading: false,
      isError: false,
      error: null,
    });
    render(<Account />);
    expect(screen.getByText('account.socialStatus.title')).toBeInTheDocument();
    const twitterCheckbox = screen.getByLabelText('Twitter');
    expect(twitterCheckbox).toBeInTheDocument();
    expect(twitterCheckbox).toBeDisabled();
    expect(twitterCheckbox).not.toBeChecked();
  });

  it('should display basic user information correctly', () => {
    const specificUser = { id: '2', username: 'janedoe', email: 'jane@example.com' } as User;
    mockUseGetAccountDefault.mockReturnValue({
      data: { user: specificUser },
      isLoading: false,
      isError: false,
    });
    mockUserAdapterFn.mockImplementationOnce((user: User) => ({ // mockImplementationOnce for specific test behavior
        id: user.id,
        username: `Adapted ${user.username}`, // Ensure this matches what you expect
        email: user.email
    }));
    // Provide a default successful state for social status for this test too
    mockUseCompanySocialStatusDefault.mockReturnValue({
      data: { networks: [] } as AdaptedCompanySocialStatus,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<Account />);
    expect(screen.getByText('Adapted janedoe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });
});

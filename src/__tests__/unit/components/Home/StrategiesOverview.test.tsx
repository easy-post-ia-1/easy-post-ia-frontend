import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import i18n from '../../../../_i18n/index';
import StrategiesOverview from '../../../../components/home/StrategiesOverview';
import { FetchedStrategy, STRATEGY_STATUS_DISPLAY } from '../../../../models/strategy.model';
import { vi } from 'vitest';

// Mock the useStrategies hook
vi.mock('../../../../hooks/queries/strategy/useStrategies.ts', () => ({
  useStrategies: vi.fn(),
}));

// Mock data
const mockStrategiesPage1Data: FetchedStrategy[] = [
  {
    id: 1,
    description: 'Description 1',
    status: 0,
    status_display: STRATEGY_STATUS_DISPLAY[0],
    from_schedule: '2024-01-01',
    to_schedule: '2024-01-31',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  {
    id: 2,
    description: 'Description 2',
    status: 1,
    status_display: STRATEGY_STATUS_DISPLAY[1],
    from_schedule: '2024-02-01',
    to_schedule: '2024-02-28',
    created_at: '2024-02-01',
    updated_at: '2024-02-01',
  },
];

const mockTotalStrategies = 3;

describe('StrategiesOverview', () => {
  let queryClient: QueryClient;
  let mockUseStrategies: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    // Get the mocked function
    const { useStrategies } = await import('../../../../hooks/queries/strategy/useStrategies.ts');
    mockUseStrategies = useStrategies;
  });

  it('renders loading state initially', () => {
    mockUseStrategies.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n}>
            <StrategiesOverview />
          </I18nextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );

    // Check for the title (should be translated to "Your Strategies")
    expect(screen.getByText('Your Strategies')).toBeInTheDocument();
    // Check for skeleton elements (Material-UI Skeleton components)
    // Skeleton components render as div elements with specific styling
    const skeletonElements = document.querySelectorAll('[class*="MuiSkeleton"]');
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it('renders strategies after loading', async () => {
    mockUseStrategies.mockReturnValue({
      data: {
        strategies: mockStrategiesPage1Data,
        pagination: {
          pages: 1,
          current_page: 1,
          total: mockTotalStrategies,
        },
      },
      isLoading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n}>
            <StrategiesOverview />
          </I18nextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Description 1')).toBeInTheDocument();
      expect(screen.getByText('Description 2')).toBeInTheDocument();
    });
  });

  it('handles pagination correctly', async () => {
    mockUseStrategies.mockReturnValue({
      data: {
        strategies: mockStrategiesPage1Data,
        pagination: {
          pages: 2,
          current_page: 1,
          total: mockTotalStrategies,
        },
      },
      isLoading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n}>
            <StrategiesOverview />
          </I18nextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('Description 1')).toBeInTheDocument();
    });

    // Check pagination is present
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('handles error state', async () => {
    mockUseStrategies.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Failed to fetch strategies'),
    });

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n}>
            <StrategiesOverview />
          </I18nextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });
});

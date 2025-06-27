import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../_i18n';
import StrategiesOverview from '@components/home/StrategiesOverview';
import { FetchedStrategy, STRATEGY_STATUS_DISPLAY } from '@models/strategy.model';

// Mock the adapter
jest.mock('@adapters/strategy.adapter', () => ({
  fetchedStrategiesAdapter: jest.fn(),
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

const mockStrategiesPage2Data: FetchedStrategy[] = [
  {
    id: 3,
    description: 'Description 3',
    status: 2,
    status_display: STRATEGY_STATUS_DISPLAY[2],
    from_schedule: '2024-03-01',
    to_schedule: '2024-03-31',
    created_at: '2024-03-01',
    updated_at: '2024-03-01',
  },
];

const mockTotalStrategies = 3;

describe('StrategiesOverview', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <StrategiesOverview />
      </I18nextProvider>
    );

    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  it('renders strategies after loading', async () => {
    require('@adapters/strategy.adapter').fetchedStrategiesAdapter.mockImplementationOnce(
      (strategies: FetchedStrategy[], page: number, limit: number) => ({
        strategies: mockStrategiesPage1Data.map((s) => ({ ...s, id: String(s.id), color: 'blue' })),
        total: mockTotalStrategies,
        page,
        limit,
      })
    );

    render(
      <I18nextProvider i18n={i18n}>
        <StrategiesOverview />
      </I18nextProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Description 1')).toBeInTheDocument();
      expect(screen.getByText('Description 2')).toBeInTheDocument();
    });
  });

  it('handles pagination correctly', async () => {
    require('@adapters/strategy.adapter').fetchedStrategiesAdapter
      .mockImplementationOnce(
        (strategies: FetchedStrategy[], page: number, limit: number) => ({
          strategies: mockStrategiesPage1Data.map((s) => ({ ...s, id: String(s.id), color: 'blue' })),
          total: mockTotalStrategies,
          page,
          limit,
        })
      )
      .mockImplementationOnce(
        (strategies: FetchedStrategy[], page: number, limit: number) => ({
          strategies: mockStrategiesPage2Data.map((s) => ({ ...s, id: String(s.id), color: 'green' })),
          total: mockTotalStrategies,
          page,
          limit,
        })
      );

    render(
      <I18nextProvider i18n={i18n}>
        <StrategiesOverview />
      </I18nextProvider>
    );

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('Description 1')).toBeInTheDocument();
    });

    // Click next page
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    // Wait for page 2
    await waitFor(() => {
      expect(screen.getByText('Description 3')).toBeInTheDocument();
    });
  });

  it('handles error state', async () => {
    require('@adapters/strategy.adapter').fetchedStrategiesAdapter.mockImplementationOnce(() => {
      throw new Error('Failed to fetch strategies');
    });

    render(
      <I18nextProvider i18n={i18n}>
        <StrategiesOverview />
      </I18nextProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});

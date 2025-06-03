import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../_i18n'; // Adjusted path
import StrategiesOverview from '@components/Home/StrategiesOverview'; // Adjusted path
import { STRATEGIES_PER_PAGE } from '@utils/constants/home.constants'; // Adjusted path
import { FetchedStrategy } from '@models/strategy.model'; // Adjusted path

// Mock the strategy adapter
jest.mock('@adapters/strategy.adapter', () => ({
  fetchedStrategiesAdapter: jest.fn((strategies: FetchedStrategy[], page: number, limit: number) => {
    const colorCycle = ['blue', 'green', 'red', 'purple', 'orange'];
    return {
      strategies: strategies.map((s, index) => ({
        ...s,
        id: String(s.id),
        color: colorCycle[index % colorCycle.length],
      })),
      total: mockTotalStrategies, // Make sure this is defined or imported if used for totalPages calculation
      page,
      limit,
    };
  }),
}));

// Mock API call (used internally by StrategiesOverview)
const mockFetchStrategiesAPI = jest.fn();
// This is a simplified mock. In a real test, you might want to mock the specific module
// where fetchStrategiesAPI is defined if it's not passed as a prop or directly part of the component.
// For this example, we assume it's an import that can be mocked globally or within the component's scope for testing.
// Let's adjust the component to allow mocking or spy on its internal fetch.
// For now, we'll mock a global/module-level function if that's how it's implemented.
// If fetchStrategiesAPI is imported from a module, e.g. '@services/api':
// jest.mock('@services/api', () => ({
//   fetchStrategiesAPI: mockFetchStrategiesAPI,
// }));
// Since fetchStrategiesAPI is defined within StrategiesOverview.tsx, we need a different approach.
// One way is to refactor StrategiesOverview to accept fetchStrategiesAPI as a prop for easier testing.
// Another is to use jest.spyOn if it's a module export that can be spied on.
// For this exercise, the component has been refactored to accept fetchStrategiesApiOverride as a prop.

const mockTotalStrategies = 20; // Example total
const mockStrategiesPage1Data: FetchedStrategy[] = Array.from({ length: STRATEGIES_PER_PAGE }, (_, i) => ({
  id: i + 1,
  name: `Strategy ${String.fromCharCode(65 + i)}`, // A, B, C, D
  description: `Description for strategy ${String.fromCharCode(65 + i)}`,
}));
const mockStrategiesPage2Data: FetchedStrategy[] = Array.from({ length: STRATEGIES_PER_PAGE }, (_, i) => ({
  id: i + 1 + STRATEGIES_PER_PAGE, // 5, 6, 7, 8
  name: `Strategy ${String.fromCharCode(65 + i + STRATEGIES_PER_PAGE)}`, // E, F, G, H
  description: `Description for strategy ${String.fromCharCode(65 + i + STRATEGIES_PER_PAGE)}`,
}));


// Helper function to render with I18nextProvider
const renderWithProviders = (ui: React.ReactElement, fetchApiMock?: jest.Mock) => {
  // Cast to any because StrategiesOverviewProps is not exported, but it's fine for testing
  const component = React.cloneElement(ui, { fetchStrategiesApiOverride: fetchApiMock } as any);
  return render(
    <I18nextProvider i18n={i18n}>
      {component}
    </I18nextProvider>
  );
};


describe('StrategiesOverview', () => {
  let fetchApiMock: jest.Mock;

  beforeEach(() => {
    fetchApiMock = jest.fn();
    // Clear adapter mock calls too
    require('@adapters/strategy.adapter').fetchedStrategiesAdapter.mockClear();
  });

  test('renders loading state initially', () => {
    fetchApiMock.mockReturnValue(new Promise(() => {})); // Never resolves
    renderWithProviders(<StrategiesOverview />, fetchApiMock);
    expect(screen.getByText('strategiesOverview.loading...')).toBeInTheDocument();
    // Check for skeleton elements by their text content
    const skeletons = screen.getAllByText('strategiesOverview.loading...', { exact: false });
    // Check for the correct number of loading skeletons
    expect(skeletons.length).toBe(STRATEGIES_PER_PAGE);
  });

  test('renders empty state when no strategies are fetched', async () => {
    fetchApiMock.mockResolvedValue([]); // API returns empty array
    // Adapter will then be called with this empty array
    require('@adapters/strategy.adapter').fetchedStrategiesAdapter.mockReturnValue({
      strategies: [],
      total: 0, // No strategies, so total is 0
      page: 1,
      limit: STRATEGIES_PER_PAGE,
    });

    renderWithProviders(<StrategiesOverview />, fetchApiMock);
    await waitFor(() => {
      expect(screen.getByText('strategiesOverview.emptyState')).toBeInTheDocument();
    });
    expect(fetchApiMock).toHaveBeenCalledWith(1, STRATEGIES_PER_PAGE);
  });

  test('renders error state on API error', async () => {
    fetchApiMock.mockRejectedValue(new Error('API Error')); // API call fails
    // The adapter will not be called in this case, or if it is, the component should handle the error from the fetch call.
    // The component's catch block should set the error state.
    renderWithProviders(<StrategiesOverview />, fetchApiMock);
    await waitFor(() => {
      expect(screen.getByText('strategiesOverview.errors.fetch')).toBeInTheDocument();
    });
    expect(fetchApiMock).toHaveBeenCalledWith(1, STRATEGIES_PER_PAGE);
  });

  test('renders strategy cards with correct data and pagination', async () => {
    fetchApiMock.mockResolvedValueOnce(mockStrategiesPage1Data); // For initial load (page 1)
    // Mock adapter behavior for page 1
    require('@adapters/strategy.adapter').fetchedStrategiesAdapter.mockImplementationOnce(
      (strategies: FetchedStrategy[], page: number, limit: number) => ({ // Explicitly type here
        strategies: mockStrategiesPage1Data.map((s, idx) => ({ ...s, id: String(s.id), color: 'blue' })),
        total: mockTotalStrategies,
        page,
        limit,
      })
    );

    renderWithProviders(<StrategiesOverview />, fetchApiMock);

    await waitFor(() => {
      expect(screen.getByText('Strategy A')).toBeInTheDocument();
      expect(screen.getByText('Description for strategy A')).toBeInTheDocument();
    });
    const strategyCardsPage1 = screen.getAllByText(/Strategy [A-D]/);
    expect(strategyCardsPage1.length).toBe(STRATEGIES_PER_PAGE);
    expect(fetchApiMock).toHaveBeenCalledWith(1, STRATEGIES_PER_PAGE);

    // Test pagination - click next page
    const page2Button = screen.getByRole('button', { name: /Go to page 2/i });
    expect(page2Button).toBeInTheDocument();

    fetchApiMock.mockResolvedValueOnce(mockStrategiesPage2Data); // For page 2 load
    // Mock adapter behavior for page 2
    require('@adapters/strategy.adapter').fetchedStrategiesAdapter.mockImplementationOnce(
       (strategies: FetchedStrategy[], page: number, limit: number) => ({ // Explicitly type here
        strategies: mockStrategiesPage2Data.map((s, idx) => ({ ...s, id: String(s.id), color: 'green' })),
        total: mockTotalStrategies,
        page,
        limit,
      })
    );

    fireEvent.click(page2Button);

    await waitFor(() => {
      expect(screen.getByText('Strategy E')).toBeInTheDocument();
      expect(screen.getByText('Description for strategy E')).toBeInTheDocument();
    });
    const strategyCardsPage2 = screen.getAllByText(/Strategy [E-H]/);
    expect(strategyCardsPage2.length).toBe(STRATEGIES_PER_PAGE);
    expect(fetchApiMock).toHaveBeenCalledWith(2, STRATEGIES_PER_PAGE); // Check API call for page 2
  });

  test('strategy cards display correct color border', async () => {
    const mockColor = 'purple';
    const singleStrategyData: FetchedStrategy[] = [{ id: '99', name: 'Strategy X', description: 'Desc X' }];
    fetchApiMock.mockResolvedValue(singleStrategyData);
    require('@adapters/strategy.adapter').fetchedStrategiesAdapter.mockReturnValueOnce({
      strategies: [{ id: '99', name: 'Strategy X', description: 'Desc X', color: mockColor }],
      total: 1,
      page: 1,
      limit: STRATEGIES_PER_PAGE,
    });

    renderWithProviders(<StrategiesOverview />, fetchApiMock);
    await waitFor(() => {
      const strategyCard = screen.getByText('Strategy X').closest('div');
      expect(strategyCard).toHaveStyle(`border: 2px solid ${mockColor}`);
    });
  });

  test('translations are applied correctly for title and empty state', async () => {
    // Test title (always present)
    fetchApiMock.mockResolvedValue(mockStrategiesPage1Data); // Need some data to pass loading
     require('@adapters/strategy.adapter').fetchedStrategiesAdapter.mockReturnValueOnce({
        strategies: mockStrategiesPage1Data.map(s => ({...s, id: String(s.id), color: 'blue'})),
        total: mockTotalStrategies, page:1, limit: STRATEGIES_PER_PAGE
    });
    renderWithProviders(<StrategiesOverview />, fetchApiMock);
    await waitFor(() => {
      expect(screen.getByText('Strategies')).toBeInTheDocument(); // Title in English
    });

    // Test empty state translation
    fetchApiMock.mockResolvedValue([]);
    require('@adapters/strategy.adapter').fetchedStrategiesAdapter.mockReturnValue({
        strategies: [], total: 0, page: 1, limit: STRATEGIES_PER_PAGE,
    });
    // Re-render for empty state
    renderWithProviders(<StrategiesOverview />, fetchApiMock);
    await waitFor(() => {
        expect(screen.getByText('No strategies found. Get started by creating a new strategy.')).toBeInTheDocument();
    });
  });

  describe('Spanish Translations', () => {
    beforeAll(async () => {
      await i18n.changeLanguage('es');
    });

    afterAll(async () => {
      await i18n.changeLanguage('en'); // Reset to English after Spanish tests
    });

    test('renders translated title and loading state in Spanish', () => {
      fetchApiMock.mockReturnValue(new Promise(() => {})); // Keep it loading
      renderWithProviders(<StrategiesOverview />, fetchApiMock);
      expect(screen.getByText('Estrategias')).toBeInTheDocument(); // Title
      expect(screen.getAllByText('Cargando estrategias...').length).toBeGreaterThanOrEqual(1); // Loading text in skeletons
    });

    test('renders translated empty state in Spanish', async () => {
      fetchApiMock.mockResolvedValue([]);
      require('@adapters/strategy.adapter').fetchedStrategiesAdapter.mockReturnValue({
        strategies: [], total: 0, page: 1, limit: STRATEGIES_PER_PAGE,
      });
      renderWithProviders(<StrategiesOverview />, fetchApiMock);
      await waitFor(() => {
        expect(screen.getByText('No se encontraron estrategias. Comienza creando una nueva estrategia.')).toBeInTheDocument();
      });
    });

    test('renders translated error state in Spanish', async () => {
      fetchApiMock.mockRejectedValue(new Error('API Error'));
      renderWithProviders(<StrategiesOverview />, fetchApiMock);
      await waitFor(() => {
        expect(screen.getByText('Error al cargar las estrategias. Por favor, inténtalo de nuevo más tarde.')).toBeInTheDocument();
      });
    });
  });
});

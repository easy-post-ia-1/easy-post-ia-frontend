import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import i18n from '../../../../_i18n/index';
import CalendarView from '../../../../components/home/CalendarView';
import { vi } from 'vitest'

// Mock the internal fetchCalendarDataAPI
// Similar to StrategiesOverview, if this is an internal function, it's tricky.
// We'll assume it can be mocked or the component refactored.
// For this example, we'll mock the states directly based on how the component behaves.

// Mock the useCalendarPostsQuery hook
vi.mock('../../../../hooks/queries/calendar/useCalendarPostsQuery.ts', () => ({
  useCalendarPostsQuery: vi.fn(),
}));

describe('CalendarView', () => {
  let queryClient: QueryClient;
  let mockUseCalendarPostsQuery: any;

  beforeEach(async () => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    // Get the mocked function
    const { useCalendarPostsQuery } = await import('../../../../hooks/queries/calendar/useCalendarPostsQuery.ts');
    mockUseCalendarPostsQuery = useCalendarPostsQuery;
  });

  // Helper function to render with I18nextProvider and QueryClientProvider
  const renderCalendarView = () => {
    return render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n}>
            <CalendarView />
          </I18nextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );
  };

  test('renders loading state initially', () => {
    mockUseCalendarPostsQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
    });
    renderCalendarView();
    // Check for the title (should be translated to "Calendar View")
    expect(screen.getByText('Calendar View')).toBeInTheDocument();
    // Check for skeleton elements (Material-UI Skeleton components)
    const skeletonElements = document.querySelectorAll('[class*="MuiSkeleton"]');
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  test('renders empty state when API returns empty data', async () => {
    mockUseCalendarPostsQuery.mockReturnValue({
      data: { posts: [] },
      isLoading: false,
      isError: false,
      error: null,
    });
    renderCalendarView();
    await waitFor(() => {
      expect(screen.getByText('No events scheduled in the calendar.')).toBeInTheDocument();
    });
  });

  test('renders error state on API error', async () => {
    mockUseCalendarPostsQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: { message: 'Failed to load' },
    });
    renderCalendarView();
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  test('renders calendar with posts when API returns data', async () => {
    mockUseCalendarPostsQuery.mockReturnValue({
      data: { 
        posts: [{ 
          id: 1, 
          title: 'Test Post', 
          programming_date_to_post: '2024-01-01T10:00:00Z' 
        }] 
      },
      isLoading: false,
      isError: false,
      error: null,
    });
    renderCalendarView();
    await waitFor(() => {
      expect(screen.getByText('Calendar View')).toBeInTheDocument();
    });
  });

  test('translations are applied correctly for title and other states', async () => {
    mockUseCalendarPostsQuery.mockReturnValue({
      data: { posts: [] },
      isLoading: false,
      isError: false,
      error: null,
    });
    renderCalendarView();
    await waitFor(() => {
      expect(screen.getByText('Calendar View')).toBeInTheDocument();
    });
  });

  describe('Spanish Translations', () => {
    beforeAll(async () => {
      await i18n.changeLanguage('es');
    });

    afterAll(async () => {
      await i18n.changeLanguage('en'); // Reset to English
    });

    test('renders translated title and loading state in Spanish', () => {
      mockUseCalendarPostsQuery.mockReturnValue({
        data: null,
        isLoading: true,
        isError: false,
        error: null,
      });
      renderCalendarView();
      expect(screen.getByText('Vista de Calendario')).toBeInTheDocument(); // Title
      // Check for skeleton elements (Material-UI Skeleton components)
      const skeletonElements = document.querySelectorAll('[class*="MuiSkeleton"]');
      expect(skeletonElements.length).toBeGreaterThan(0);
    });

    test('renders translated empty state in Spanish', async () => {
      mockUseCalendarPostsQuery.mockReturnValue({
        data: { posts: [] },
        isLoading: false,
        isError: false,
        error: null,
      });
      renderCalendarView();
      await waitFor(() => {
        expect(screen.getByText('No hay eventos programados en el calendario.')).toBeInTheDocument();
      });
    });

    test('renders translated error state in Spanish', async () => {
      mockUseCalendarPostsQuery.mockReturnValue({
        data: null,
        isLoading: false,
        isError: true,
        error: { message: 'API Error' },
      });
      renderCalendarView();
      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
    });

    test('renders calendar with translated title in Spanish', async () => {
      mockUseCalendarPostsQuery.mockReturnValue({
        data: { posts: [{ id: 1, title: 'Test Post', programming_date_to_post: '2024-01-01T10:00:00Z' }] },
        isLoading: false,
        isError: false,
        error: null,
      });
      renderCalendarView();
      await waitFor(() => {
        expect(screen.getByText('Vista de Calendario')).toBeInTheDocument(); // Title
      });
    });
  });
});

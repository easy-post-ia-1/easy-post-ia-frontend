import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../_i18n'; // Adjusted path
import CalendarView from '@components/home/CalendarView'; // Adjusted path

// Mock the internal fetchCalendarDataAPI
// Similar to StrategiesOverview, if this is an internal function, it's tricky.
// We'll assume it can be mocked or the component refactored.
// For this example, we'll mock the states directly based on how the component behaves.

// Mocking the fetchCalendarDataAPI that is defined inside CalendarView.tsx
// This requires a more advanced mocking technique (e.g., jest.spyOn if it were a module export)
// or refactoring CalendarView to accept the API call as a prop.
// The component has been refactored to accept fetchCalendarDataApiOverride as a prop.

describe('CalendarView', () => {
  let fetchApiMock: jest.Mock;

  beforeEach(() => {
    fetchApiMock = jest.fn();
  });

  // Helper function to render with I18nextProvider and the mock prop
  const renderWithMockApi = (ui: React.ReactElement, mockFunc: jest.Mock) => {
    const componentWithMock = React.cloneElement(ui, { fetchCalendarDataApiOverride: mockFunc } as any);
    return render(
      <I18nextProvider i18n={i18n}>
        {componentWithMock}
      </I18nextProvider>
    );
  };

  test('renders loading state initially', () => {
    fetchApiMock.mockReturnValue(new Promise(() => {})); // Never resolves
    renderWithMockApi(<CalendarView />, fetchApiMock);
    expect(screen.getByText('calendarView.loading')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders empty state when API returns isEmpty true', async () => {
    fetchApiMock.mockResolvedValue({ isEmpty: true, data: [] });
    renderWithMockApi(<CalendarView />, fetchApiMock);
    await waitFor(() => {
      expect(screen.getByText('calendarView.emptyState')).toBeInTheDocument();
    });
    expect(fetchApiMock).toHaveBeenCalledTimes(1);
  });

  test('renders error state on API error', async () => {
    fetchApiMock.mockRejectedValue(new Error('Failed to load'));
    renderWithMockApi(<CalendarView />, fetchApiMock);
    await waitFor(() => {
      expect(screen.getByText('calendarView.errors.fetch')).toBeInTheDocument();
    });
    expect(fetchApiMock).toHaveBeenCalledTimes(1);
  });

  test('renders default calendar display (placeholder) when API returns data', async () => {
    fetchApiMock.mockResolvedValue({ isEmpty: false, data: [{ event: 'Some Event' }] });
    renderWithMockApi(<CalendarView />, fetchApiMock);
    await waitFor(() => {
      expect(screen.getByText('Calendar')).toBeInTheDocument(); // Title
      expect(screen.getByText('[Calendar Placeholder]')).toBeInTheDocument();
    });
    expect(fetchApiMock).toHaveBeenCalledTimes(1);
  });

  test('translations are applied correctly for title and other states', async () => {
    // Test title with default data state
    fetchApiMock.mockResolvedValue({ isEmpty: false, data: [{ event: 'Some Event' }] });
    renderWithMockApi(<CalendarView />, fetchApiMock);
    await waitFor(() => {
      expect(screen.getByText('Calendar')).toBeInTheDocument(); // English "Calendar"
    });

    // Test empty state translation
    fetchApiMock.mockResolvedValue({ isEmpty: true, data: [] });
    renderWithMockApi(<CalendarView />, fetchApiMock); // Re-render for new state
    await waitFor(() => {
      expect(screen.getByText('No events scheduled in the calendar.')).toBeInTheDocument();
    });

    // Test loading state translation
    fetchApiMock.mockReturnValue(new Promise(() => {}));
    renderWithMockApi(<CalendarView />, fetchApiMock);
    await waitFor(() => { // Default state is loading, so this should be immediate or after a very short timeout
        expect(screen.getByText('Loading calendar...')).toBeInTheDocument();
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
      fetchApiMock.mockReturnValue(new Promise(() => {})); // Keep loading
      renderWithMockApi(<CalendarView />, fetchApiMock);
      expect(screen.getByText('Calendario')).toBeInTheDocument(); // Title
      expect(screen.getByText('Cargando calendario...')).toBeInTheDocument(); // Loading text
    });

    test('renders translated empty state in Spanish', async () => {
      fetchApiMock.mockResolvedValue({ isEmpty: true, data: [] });
      renderWithMockApi(<CalendarView />, fetchApiMock);
      await waitFor(() => {
        expect(screen.getByText('No hay eventos programados en el calendario.')).toBeInTheDocument();
      });
    });

    test('renders translated error state in Spanish', async () => {
      fetchApiMock.mockRejectedValue(new Error('API Error'));
      renderWithMockApi(<CalendarView />, fetchApiMock);
      await waitFor(() => {
        expect(screen.getByText('Error al cargar los datos del calendario. Por favor, inténtalo de nuevo más tarde.')).toBeInTheDocument();
      });
    });

    test('renders default calendar display with translated title in Spanish', async () => {
      fetchApiMock.mockResolvedValue({ isEmpty: false, data: [{ event: 'Some Event' }] });
      renderWithMockApi(<CalendarView />, fetchApiMock);
      await waitFor(() => {
        expect(screen.getByText('Calendario')).toBeInTheDocument(); // Title
        expect(screen.getByText('[Calendar Placeholder]')).toBeInTheDocument(); // Placeholder should remain
      });
    });
  });
});

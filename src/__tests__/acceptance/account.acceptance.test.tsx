import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../_i18n/index';
import Account from '../../pages/Account';

vi.mock('@hooks/queries/user/useProfileQuery', () => ({
  useGetAccount: () => ({
    data: { user: { id: 1, username: 'acceptuser', email: 'accept@mail.com' } },
    isLoading: false,
    isError: false,
  }),
}));

describe('Account acceptance', () => {
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

  it('shows user info on the Account page', () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n}>
            <Account />
          </I18nextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );
    expect(screen.getByText('acceptuser')).toBeInTheDocument();
    expect(screen.getByText('accept@mail.com')).toBeInTheDocument();
  });
}); 
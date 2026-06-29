import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter as Router } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import App from './App';

vi.mock('@availity/element', async () => {
  const actual = await vi.importActual('@availity/element');
  return {
    ...actual,
    Spaces: ({ children }: { children: React.ReactNode }) => <div data-testid="spaces-mock">{children}</div>,
  };
});

const renderApp = (route = '/') =>
  render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <Router initialEntries={[route]}>
        <App />
      </Router>
    </QueryClientProvider>
  );

describe('App', () => {
  test('renders the page header', () => {
    renderApp();
    expect(screen.getByText('My Application')).toBeInTheDocument();
  });

  test('renders the app container', () => {
    renderApp();
    expect(screen.getByTestId('app-container')).toBeInTheDocument();
  });

  test('renders the footer', () => {
    renderApp();
    expect(screen.getByText(/Availity/)).toBeInTheDocument();
  });

  test('renders the request form at root route', () => {
    renderApp('/');
    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('shows validation errors when submitting empty form', async () => {
    const user = userEvent.setup();
    renderApp('/');

    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  test('navigates to response page on valid submission', async () => {
    const user = userEvent.setup();
    renderApp('/');

    await user.type(screen.getByRole('textbox', { name: /name/i }), 'Jane Smith');
    await user.type(screen.getByRole('textbox', { name: /email/i }), 'jane@example.com');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText('Your request has been submitted.')).toBeInTheDocument();
    });
  });
});

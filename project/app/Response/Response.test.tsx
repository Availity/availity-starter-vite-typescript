import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter as Router } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { Response } from './Response';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock('@/hooks/useSubmission', () => ({
  useSubmission: () => ({
    data: { id: 'REF-ABC123', status: 'Received', submittedAt: '6/29/2026, 12:00:00 PM' },
    isLoading: false,
  }),
}));

const renderResponse = () =>
  render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <Router>
        <Response />
      </Router>
    </QueryClientProvider>
  );

describe('Response', () => {
  beforeEach(() => mockNavigate.mockClear());

  test('renders success alert', () => {
    renderResponse();
    expect(screen.getByText('Your request has been submitted.')).toBeInTheDocument();
  });

  test('renders submission details', () => {
    renderResponse();
    expect(screen.getByText('REF-ABC123')).toBeInTheDocument();
    expect(screen.getByText('Received')).toBeInTheDocument();
  });

  test('new request button navigates to home', async () => {
    const user = userEvent.setup();
    renderResponse();

    await user.click(screen.getByRole('button', { name: /new request/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});

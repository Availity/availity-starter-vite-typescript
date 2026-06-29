import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@availity/element';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import App from './App';

const container = document.getElementById('root');
if (!container) throw new Error('Unable to find root node');
const root = createRoot(container);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // Data is considered fresh for 5 minutes. Adjust per your app's needs.
      // Use Infinity only for truly static data (e.g., feature flags).
      staleTime: 5 * 60 * 1000,
    },
  },
});

root.render(
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </ThemeProvider>
);

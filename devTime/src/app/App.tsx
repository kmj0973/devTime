import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Router from './providers/RouterProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={<div>에러발생</div>}>
        <Suspense fallback={<div className='skeleton-layout'>gdgd</div>}>
          <Router />
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;

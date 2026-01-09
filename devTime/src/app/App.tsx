import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Router from './providers/RouterProvider';
import { NavBar } from '@/widgets/navBar/ui/NavBar';

function App() {
  return (
    <ErrorBoundary fallback={<div>에러발생</div>}>
      <Suspense
        fallback={
          <div className='h-screen items-center bg-linear-to-b from-[#F6F7F9] to-[#E9ECF5] pt-4'>
            <NavBar />
          </div>
        }
      >
        <Router />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;

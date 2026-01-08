import { Suspense } from 'react';
import Router from './providers/RouterProvider';
import { NavBar } from '@/widgets/navBar/ui/NavBar';

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div className='h-screen items-center bg-linear-to-b from-[#F6F7F9] to-[#E9ECF5] pt-4'>
            <NavBar />
          </div>
        }
      >
        <Router />
      </Suspense>
    </>
  );
}

export default App;

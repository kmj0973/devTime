import HomePage from '@/pages/home/ui/HomePage';
import LoginPage from '@/pages/login/ui/LoginPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: 'login', element: <LoginPage /> },
  { path: 'signup', element: <div>signup page</div> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}

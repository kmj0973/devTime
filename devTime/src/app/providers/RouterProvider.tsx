import DashboardPage from '@/pages/dashboard/ui/DashboardPage';
import HomePage from '@/pages/home/ui/HomePage';
import LoginPage from '@/pages/login/ui/LoginPage';
import ProfilePage from '@/pages/profile/ProfilePage';
import ModalRoot from '@/pages/public/ModalRoot';
import RankingPage from '@/pages/ranking/ui/RankingPage';
import SignUpPage from '@/pages/signup/ui/SignUpPage';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <ModalRoot />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignUpPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'ranking', element: <RankingPage /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}

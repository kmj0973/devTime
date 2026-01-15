import DashboardPage from '@/pages/dashboard/ui/DashboardPage';
import HomePage from '@/pages/home/ui/HomePage';
import LoginPage from '@/pages/login/ui/LoginPage';
import EditMyPage from '@/pages/mypage/ui/EditMyPage';
import MyPage from '@/pages/mypage/ui/MyPage';
import ProfilePage from '@/pages/profile/ProfilePage';
import ModalRoot from '@/pages/public/ModalRoot';
import RankingPage from '@/pages/ranking/ui/RankingPage';
import SignUpPage from '@/pages/signup/ui/SignUpPage';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './ProtecedRoute';

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
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'ranking',
        element: (
          <ProtectedRoute>
            <RankingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'mypage',
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'mypage/edit',
        element: (
          <ProtectedRoute>
            <EditMyPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}

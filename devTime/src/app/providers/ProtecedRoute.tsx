import useAuthStore from '@/shared/store/useAuthStore';
import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isLogined = useAuthStore((state) => state.isLogined);

  if (!isLogined) {
    return <Navigate to='/' replace />;
  }

  return children;
}

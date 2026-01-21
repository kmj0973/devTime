import useAuthStore from '@/shared/store/useAuthStore';
import useModalStore from '@/shared/store/useModalStroe';
import { useTimerStore } from '@/shared/store/useTimerStore';
import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isLogined = useAuthStore((state) => state.isLogined);

  if (!isLogined) {
    useAuthStore.getState().logout();
    useTimerStore.getState().reset();
    useModalStore.getState().closeModal();
    return <Navigate to='/' replace />;
  }

  return children;
}

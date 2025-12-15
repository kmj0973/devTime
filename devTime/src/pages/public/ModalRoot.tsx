import LoginDuplicateDialog from '@/features/auth/ui/LoginForm/LoginDuplicateDialog';
import LoginFailureDialog from '@/features/auth/ui/LoginForm/LoginFailureDialog';
import LoginRequiredDialog from '@/features/auth/ui/LoginRequiredDialog/LoginRequiredDialog';
import ResetDialog from '@/features/timer/ui/dialog/ResetDialog';
import ReviewDialog from '@/features/timer/ui/dialog/ReviewDialog';
import TimerStartDialog from '@/features/timer/ui/dialog/TimerStartDialog';
import TodoListDialog from '@/features/timer/ui/dialog/TodoListDialog';
import useModalStore from '@/shared/store/useModalStroe';

export default function ModalRoot() {
  const { modal } = useModalStore();

  if (!modal) return null;

  switch (modal) {
    case 'timerStart':
      return <TimerStartDialog />;
    case 'todoList':
      return <TodoListDialog />;
    case 'reset':
      return <ResetDialog />;
    case 'loginRequired':
      return <LoginRequiredDialog />;
    case 'loginFailure':
      return <LoginFailureDialog />;
    case 'loginDuplicate':
      return <LoginDuplicateDialog />;
    case 'review':
      return <ReviewDialog />;
    default:
      return null;
  }
}

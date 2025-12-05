import LoginRequiredDialog from '@/features/auth/ui/LoginRequiredDialog/LoginRequiredDialog';
import TodoListDialog from '@/features/timer/ui/TodoListDialog';
import useAuthStore from '@/shared/store/useAuthStore';
import useModalStore from '@/shared/store/useModalStroe';
import { requestDeleteTodoList } from '../api/requests';
import { useTimerStore } from '@/shared/store/useTimerStore';

export default function TimerButton() {
  const isLogined = useAuthStore((state) => state.isLogined);
  const isModalOpen = useModalStore((state) => state.isModalOpen);
  const openModal = useModalStore((state) => state.openModal);
  const timerId = useTimerStore((state) => state.timerId);

  return (
    <div className='mt-20 flex gap-20'>
      {!isLogined && isModalOpen && <LoginRequiredDialog />}
      {isLogined && isModalOpen && <TodoListDialog />}
      <svg
        onClick={() => openModal()}
        className='mx-2.5 cursor-pointer'
        width='80'
        height='100'
        viewBox='0 0 80 100'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M77.6727 45.5679C80.7758 47.5378 80.7758 52.4623 77.6727 54.4321L6.98182 99.3067C3.87879 101.277 -1.56621e-07 98.8143 0 94.8747L3.56802e-06 5.12534C3.72464e-06 1.18573 3.87879 -1.27653 6.98182 0.693278L77.6727 45.5679Z'
          fill='#4C79FF'
        />
      </svg>
      <svg
        onClick={() => requestDeleteTodoList(timerId)}
        xmlns='http://www.w3.org/2000/svg'
        width='100'
        height='100'
        viewBox='0 0 100 100'
        fill='none'
      >
        <path
          d='M8 0C3.58172 0 0 3.58172 0 8V92C0 96.4183 3.58172 100 8 100H32C36.4183 100 40 96.4183 40 92V8C40 3.58172 36.4183 0 32 0H8Z'
          fill='#4C79FF'
          fillOpacity='0.1'
        />
        <path
          d='M68 0C63.5817 0 60 3.58172 60 8V92C60 96.4183 63.5817 100 68 100H92C96.4183 100 100 96.4183 100 92V8C100 3.58172 96.4183 0 92 0H68Z'
          fill='#4C79FF'
          fillOpacity='0.1'
        />
      </svg>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='100'
        height='100'
        viewBox='0 0 100 100'
        fill='none'
      >
        <path
          d='M0 8C0 3.58172 3.58172 0 8 0H92C96.4183 0 100 3.58172 100 8V92C100 96.4183 96.4183 100 92 100H8C3.58172 100 0 96.4183 0 92V8Z'
          fill='#4C79FF'
          fillOpacity='0.1'
        />
      </svg>
    </div>
  );
}

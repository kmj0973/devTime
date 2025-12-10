import { useTimerStore } from '@/shared/store/useTimerStore';
import ResetSVG from './svg/Button/ResetSVG';
import TodoListSVG from './svg/Button/TodoListSVG';
import TodoListDialog from './TodoListDialog';
import useModalStore from '@/shared/store/useModalStroe';

export default function TodoAndReset() {
  const timerId = useTimerStore((state) => state.timerId);
  const isModalOpen = useModalStore((state) => state.isModalOpen);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <div className='flex gap-6'>
      {isModalOpen && timerId && <TodoListDialog />}
      <div
        onClick={() => openModal()}
        className='w-16 h-16 bg-white rounded-4xl cursor-pointer flex justify-center items-center'
      >
        <TodoListSVG />
      </div>
      <div className='w-16 h-16 bg-white rounded-4xl cursor-pointer flex justify-center items-center'>
        <ResetSVG />
      </div>
    </div>
  );
}

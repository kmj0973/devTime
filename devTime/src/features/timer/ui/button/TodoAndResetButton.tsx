import ResetSVG from '../svg/Button/ResetSVG';
import TodoListSVG from '../svg/Button/TodoListSVG';
import useModalStore from '@/shared/store/useModalStroe';

export default function TodoAndResetButton() {
  const openModal = useModalStore((state) => state.openModal);

  return (
    <div className='flex gap-6'>
      <div
        onClick={() => openModal('todoList')}
        className='w-16 h-16 bg-white rounded-4xl cursor-pointer flex justify-center items-center'
      >
        <TodoListSVG />
      </div>
      <div
        onClick={() => openModal('reset')}
        className='w-16 h-16 bg-white rounded-4xl cursor-pointer flex justify-center items-center'
      >
        <ResetSVG />
      </div>
    </div>
  );
}

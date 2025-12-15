import useModalStore from '@/shared/store/useModalStroe';
import { useTimer } from '../../hooks/useTimer';

export default function ResetDialog() {
  const closeModal = useModalStore((state) => state.closeModal);
  const { handleDelete } = useTimer();

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-state-dim1'>
      <div className='bg-white p-6 rounded-[12px] shadow-lg max-w-[328px] w-full'>
        <h2 className='text-title-s mb-2'>기록을 초기화 하시겠습니까?</h2>
        <p className='text-body-m text-gray-600 mb-6'>
          진행되던 타이머 기록은 삭제되고, 복구가 불가능합니다. 계속 초기화 할까요?
        </p>
        <div className='flex justify-end gap-4'>
          <div
            onClick={() => closeModal()}
            className='px-4 py-[13px] cursor-pointer bg-gray-100 text-subtitle-s text-primary rounded-[5px] hover:bg-gray-400 transition'
          >
            취소
          </div>
          <div
            onClick={() => {
              handleDelete();
              closeModal();
            }}
            className='px-4 py-[13px] cursor-pointer bg-primary text-subtitle-s text-white rounded-[5px] hover:bg-blue-700 transition'
          >
            초기화하기
          </div>
        </div>
      </div>
    </div>
  );
}

import useModalStore from '@/shared/store/useModalStroe';
import { Link } from 'react-router-dom';

export default function LoginRequiredDialog() {
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-state-dim1'>
      <div className='bg-white p-6 rounded-[12px] shadow-lg max-w-[328px] w-full'>
        <h2 className='text-title-s mb-2'>로그인이 필요합니다</h2>
        <p className='text-body-m text-gray-600 mb-6'>
          DevTime을 사용하려면 로그인이 필요합니다. 로그인 페이지로 이동할까요?
        </p>
        <div className='flex justify-end gap-4'>
          <div
            onClick={() => closeModal()}
            className='px-4 py-[13px] bg-gray-100 text-subtitle-s text-primary rounded-[5px] hover:bg-gray-400 transition'
          >
            취소
          </div>
          <Link
            onClick={() => closeModal()}
            to='/login'
            className='px-4 py-[13px] bg-primary text-subtitle-s text-white rounded-[5px] hover:bg-blue-700 transition'
          >
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}

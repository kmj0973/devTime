import useModalStore from '@/shared/store/useModalStroe';
import { useNavigate } from 'react-router-dom';

export default function LoginDuplicateDialog() {
  const closeModal = useModalStore((state) => state.closeModal);
  const navigate = useNavigate();

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-state-dim1 z-1'>
      <div className='bg-white p-6 rounded-[12px] shadow-lg max-w-[328px] w-full'>
        <h2 className='text-title-s text-gray-800 mb-3'>중복 로그인이 불가능합니다.</h2>
        <p className='text-body-m text-gray-600 mb-3'>
          다른 기기에 중복 로그인 된 상태입니다. [확인] 버튼을 누르면 다른 기기에서 강제
          로그아웃되며, 진행중이던 타이머가 있다면 기록이 자동 삭제됩니다.
        </p>
        <div className='flex justify-end gap-4'>
          <div
            onClick={() => {
              closeModal();
              navigate('/', { replace: true });
            }}
            className='px-4 py-[13px] cursor-pointer text-center bg-primary text-subtitle-s text-white rounded-[5px] hover:bg-state-hover transition'
          >
            확인
          </div>
        </div>
      </div>
    </div>
  );
}

import useModalStore from '@/shared/store/useModalStroe';

export default function LoginFailureDialog() {
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-state-dim1 z-1'>
      <div className='bg-white p-6 rounded-[12px] shadow-lg max-w-[328px] w-full'>
        <h2 className='text-title-s text-gray-800 mb-6'>로그인 정보를 다시 확인해 주세요</h2>
        <div
          onClick={() => closeModal()}
          className='px-4 py-[13px] cursor-pointer text-center bg-primary text-subtitle-s text-white rounded-[5px] hover:bg-state-hover transition'
        >
          확인
        </div>
      </div>
    </div>
  );
}

export default function DeleteDialog({
  onClose,
  onDelete,
}: {
  onClose: () => void;
  onDelete: () => Promise<void>;
}) {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-state-dim1 z-10'>
      <div className='bg-white p-6 rounded-[12px] shadow-lg max-w-[328px] w-full'>
        <h2 className='text-title-s mb-2'>기록을 삭제하시겠습니까?</h2>
        <p className='text-body-m text-gray-600 mb-6'>
          한 번 삭제된 학습 기록은 다시 복구할 수 없습니다. 그래도 계속 하시겠습니까?
        </p>
        <div className='flex justify-end gap-4'>
          <div
            onClick={() => onClose()}
            className='px-4 py-[13px] cursor-pointer bg-gray-100 text-subtitle-s text-primary rounded-[5px] hover:bg-gray-400 transition'
          >
            취소
          </div>
          <div
            onClick={() => {
              onDelete();
              onClose();
            }}
            className='px-4 py-[13px] cursor-pointer bg-primary text-subtitle-s text-white rounded-[5px] hover:bg-blue-700 transition'
          >
            삭제하기
          </div>
        </div>
      </div>
    </div>
  );
}

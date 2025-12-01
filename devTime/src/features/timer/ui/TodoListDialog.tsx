import DeleteSVG from './DeleteSVG';
import EditSVG from './EditSVG';
import TodoSVG from './TodoSVG';

export default function TodoListDialog() {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-state-dim1'>
      <div className='bg-white py-12 px-9 rounded-[12px] shadow-lg max-w-[640px] w-full'>
        <input
          className='text-4xl leading-[46px] font-bold text-primary-gradient-end placeholder:text-gray-300 mb-9 w-full focus:outline-none'
          type='text'
          placeholder='오늘의 목표'
        />
        <div className='flex flex-col mb-9'>
          <label
            htmlFor='todolist'
            className='text-[14px] leading-[18px] font-medium text-gray-600 mb-2'
          >
            할 일 목록
          </label>
          <div className='relative h-14'>
            <input
              id='todolist'
              className={`w-full h-full pl-6 pr-[68px] py-[18px] rounded-xl bg-gray-100 text-body-m placeholder:text-gray-300 focus:outline-none`}
              type='text'
              placeholder='할 일을 추가해 주세요.'
            />
            <button className='absolute right-6 h-full my-auto text-body-b text-gray-400 cursor-pointer'>
              추가
            </button>
          </div>
        </div>
        <div className='w-full h-[460px] mb-9 overflow-y-auto'>
          <div className='flex justify-center items-center w-full h-[72px] bg-primary rounded-xl px-6 py-[26px] gap-4 mb-3'>
            <TodoSVG />
            <div className='w-[382px] text-body-s text-white'>코딩테스트 문제 1개 풀어보기</div>
            <EditSVG />
            <DeleteSVG />
          </div>
          <div className='flex justify-center items-center w-full h-[72px] bg-primary rounded-xl px-6 py-[26px] gap-4 mb-3'>
            <TodoSVG />
            <div className='w-[382px] text-body-s text-white'>코딩테스트 문제 1개 풀어보기</div>
            <EditSVG />
            <DeleteSVG />
          </div>
          <div className='flex justify-center items-center w-full h-[72px] bg-primary rounded-xl px-6 py-[26px] gap-4 mb-3'>
            <TodoSVG />
            <div className='w-[382px] text-body-s text-white'>코딩테스트 문제 1개 풀어보기</div>
            <EditSVG />
            <DeleteSVG />
          </div>
        </div>
        <div className='flex justify-end gap-4'>
          <div className='px-4 py-[13px] cursor-pointer bg-gray-50 text-subtitle-s text-primary rounded-[5px] hover:bg-gray-300 transition'>
            취소
          </div>
          <div className='px-4 py-[13px] cursor-pointer bg-primary text-subtitle-s text-white rounded-[5px] hover:bg-blue-700 transition'>
            타이머 시작하기
          </div>
        </div>
      </div>
    </div>
  );
}

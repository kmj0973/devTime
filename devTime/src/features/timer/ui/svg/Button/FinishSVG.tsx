import type { ButtonType } from '@/features/timer/model/types';

export default function FinishSVG({ onClick, timerId }: ButtonType) {
  return (
    <svg
      className='cursor-pointer'
      onClick={onClick}
      xmlns='http://www.w3.org/2000/svg'
      width='100'
      height='100'
      viewBox='0 0 100 100'
      fill='none'
    >
      <path
        d='M0 8C0 3.58172 3.58172 0 8 0H92C96.4183 0 100 3.58172 100 8V92C100 96.4183 96.4183 100 92 100H8C3.58172 100 0 96.4183 0 92V8Z'
        fill='#4C79FF'
        fillOpacity={`${timerId ? '1' : '0.1'}`}
      />
    </svg>
  );
}

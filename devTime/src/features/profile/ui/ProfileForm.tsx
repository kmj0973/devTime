import { Link } from 'react-router-dom';
import { useProfileForm } from '../hooks/useProfileForm';
import SelectField from './FormField/SelectField';
import { FormField } from './FormField/FormField';
import TechStackField from './FormField/TechStackField';
import { ImageField } from './FormField/ImageField';

export default function ProfileForm() {
  const { control, watch, purpose, register, errors, handleSubmit, onSubmit, isValid } =
    useProfileForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex-1 flex flex-col justify-center items-center'
    >
      <h1 className='text-heading-b text-primary mb-9'>프로필 설정</h1>

      {/* 이메일 */}
      <SelectField
        name='career'
        label='개발 경력'
        purpose={null}
        placeholder='개발 경력을 선택해 주세요.'
        selectItems={['경력 없음', '0 - 3년', '4 - 7년', '8 - 10년', '11년 이상']}
        errors={errors}
        control={control}
        register={register}
      />

      {/* 이메일 */}
      <SelectField
        name='purpose'
        label='공부 목적'
        purpose={purpose}
        placeholder='공부의 목적을 선택해 주세요.'
        selectItems={[
          '취업 준비',
          '이직 준비',
          '단순 개발 역량 향상',
          '회사 내 프로젝트 원할하게 수행',
          '기타(직접 입력)',
        ]}
        errors={errors}
        control={control}
        register={register}
      />

      <FormField
        name='goal'
        label='공부 목표'
        register={register}
        errors={errors}
        placeholder='공부 목표를 입력해 주세요.'
      />

      <TechStackField
        name='techStacks'
        label='공부/사용 중인 기술 스택'
        placeholder='기술 스택을 검색해 등록해 주세요.'
        selectItems={[
          '취업 준비',
          '이직 준비',
          '단순 개발 역량 향상',
          '회사 내 프로젝트 원할하게 수행',
          '기타(직접 입력)',
        ]}
        register={register}
        errors={errors}
        control={control}
      />

      <ImageField
        name='profileImage'
        watch={watch}
        label='프로필 이미지'
        register={register}
        errors={errors}
      />

      <button
        type='submit'
        className={`w-[423px] h-12 rounded-[5px] ${isValid ? 'bg-primary text-white hover:bg-state-hover' : 'bg-gray-400 text-gray-300'} text-subtitle-s mb-6 cursor-pointer`}
      >
        저장하기
      </button>

      <div className='text-body-r text-primary'>
        다음에 하시겠어요?
        <Link to='/' className='text-body-b ml-3'>
          건너뛰기
        </Link>
      </div>
    </form>
  );
}

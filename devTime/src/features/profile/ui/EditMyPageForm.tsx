import { NavBar } from '@/widgets/navBar/ui/NavBar';
import { ImageField } from './FormField/ImageField';
import { useEditMyPageForm } from '../hooks/useEditMyPageForm';
import type { EditMyPageFormFields } from '../model/schema';
import { FormField } from './FormField/FormField';
import { FormWithButtonField } from './FormField/FormWithButtonField';
import SelectField from './FormField/SelectField';
import TechStackField from './FormField/TechStackField';
import { useNavigate } from 'react-router-dom';

export default function EditMyPageForm() {
  const {
    watch,
    control,
    nickname,
    onCheckNickname,
    handleNicknameCheck,
    isNicknameChecked,
    register,
    handleSubmit,
    onSubmit,
    isValid,
    errors,
  } = useEditMyPageForm();

  const navigate = useNavigate();

  return (
    <div className='h-screen items-center bg-linear-to-b from-[#F6F7F9] to-[#E9ECF5] pt-4'>
      <NavBar />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full flex justify-center items-center mt-10'
      >
        <div className='bg-white w-[1200px] flex flex-col justify-start items-start p-9 gap-3 rounded-xl'>
          <ImageField<EditMyPageFormFields>
            name='profileImage'
            watch={watch}
            label='프로필 이미지'
            register={register}
            errors={errors}
          />
          <div className='flex gap-18'>
            <div className='flex flex-col'>
              <FormWithButtonField
                name='nickname'
                label='닉네임'
                register={register}
                value={nickname}
                errors={errors}
                placeholder='닉네임을 입력해 주세요.'
                onCheck={onCheckNickname}
                handleCheck={handleNicknameCheck}
                isChecked={isNicknameChecked}
                showCheckButton
              />
              <FormField<EditMyPageFormFields>
                name='password'
                label='비밀번호'
                register={register}
                errors={errors}
                placeholder='비밀번호를 입력해 주세요.'
                edit={true}
              />
              <FormField<EditMyPageFormFields>
                name='confirmPassword'
                label='비밀번호 확인'
                register={register}
                errors={errors}
                placeholder='비밀번호를 다시 입력해 주세요.'
                edit={true}
              />
            </div>
            <div className='flex flex-col'>
              <div className='w-[528px]'>
                <SelectField<EditMyPageFormFields>
                  name='career'
                  label='개발 경력'
                  purpose={null}
                  placeholder='개발 경력을 선택해 주세요.'
                  selectItems={['경력 없음', '0 - 3년', '4 - 7년', '8 - 10년', '11년 이상']}
                  errors={errors}
                  control={control}
                  register={register}
                />
                <FormField<EditMyPageFormFields>
                  name='goal'
                  label='공부 목표'
                  register={register}
                  errors={errors}
                  placeholder='공부 목표를 입력해 주세요.'
                  edit={true}
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
              </div>
            </div>
          </div>
          <div className='flex w-full justify-end items-center gap-4'>
            <button
              type='button'
              onClick={() => {
                navigate('/mypage');
              }}
              className='px-4 py-[13px] cursor-pointer bg-gray-100 text-subtitle-s text-primary rounded-[5px] hover:bg-gray-400 transition'
            >
              취소
            </button>
            <button
              type='submit'
              className={`px-4 py-[13px] rounded-[5px] ${isValid ? 'bg-primary text-white hover:bg-state-hover' : 'bg-gray-400 text-gray-300'} text-subtitle-s cursor-pointer`}
            >
              변경 사항 저장하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

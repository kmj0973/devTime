import { z } from 'zod';

export const profileFormSchema = z
  .object({
    career: z.string().min(1, { message: '개발 경력을 선택해 주세요.' }),
    purpose: z.string().min(1, { message: '공부 목적을 선택해 주세요.' }),
    purposeContent: z.string().optional(),
    goal: z.string().min(1, { message: '공부 목표를 작성해 주세요.' }),
    techStackInput: z.string().optional(),
    techStacks: z
      .array(z.string().min(1, { message: '기술 스택을 입력해 주세요.' }))
      .min(1, { message: '기술 스택을 하나 이상 선택해 주세요.' }),
    profileImage: z
      .any()
      .refine((files) => files.length === 1, {
        message: '이미지를 선택해 주세요.',
      })
      .refine((files) => files[0]?.size <= 5 * 1024 * 1024, {
        message: '파일 크기는 5MB 이하여야 합니다.',
      }),
  })
  .superRefine((data, ctx) => {
    if (data.purpose === '기타(직접 입력)') {
      if (!data.purposeContent || data.purposeContent.trim().length < 1) {
        ctx.addIssue({
          path: ['purposeContent'],
          message: '개발 목적을 작성해 주세요.',
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

export type ProfileFormFields = z.infer<typeof profileFormSchema>;

export const editMyPageFormSchema = z.object({
  nickname: z
    .string()
    .min(1, { message: '닉네임을 입력해 주세요.' })
    .max(20, { message: '닉네임은 최대 20자까지 입력 가능합니다.' }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.' })
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      '비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.',
    ),
  confirmPassword: z.string().min(1, { message: '비밀번호가 일치하지 않습니다.' }),
  career: z.string().min(1, { message: '개발 경력을 선택해 주세요.' }),
  goal: z
    .string()
    .min(1, { message: '공부 목표를 작성해 주세요.' })
    .min(5, { message: '공부 목표는 최소 5자 이상 입력해 주세요.' }),
  techStackInput: z.string().optional(),
  techStacks: z
    .array(z.string().min(1, { message: '기술 스택을 입력해 주세요.' }))
    .min(1, { message: '기술 스택을 하나 이상 선택해 주세요.' }),
  profileImage: z
    .any()
    .refine((files) => files.length === 1, {
      message: '이미지를 선택해 주세요.',
    })
    .refine((files) => files[0]?.size <= 5 * 1024 * 1024, {
      message: '파일 크기는 5MB 이하여야 합니다.',
    }),
});

export type EditMyPageFormFields = z.infer<typeof editMyPageFormSchema>;

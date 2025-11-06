import { z } from 'zod';

export const signupFormSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: '이메일 형식으로 작성해 주세요.' })
      .email({ message: '이메일 형식으로 작성해 주세요.' }),
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
    confirmPassword: z.string(),
    accept: z.boolean().refine((val) => val === true, { message: '약관에 동의해 주세요.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type SignUpFormFields = z.infer<typeof signupFormSchema>;

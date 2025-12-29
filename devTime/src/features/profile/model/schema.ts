import { z } from 'zod';

export const profileFormSchema = z
  .object({
    career: z.string().min(2, { message: '개발 경력을 선택해 주세요.' }),
    purpose: z.string().min(2, { message: '공부 목적을 선택해 주세요.' }),
    purposeContent: z.string().optional(),
    goal: z.string().min(5, { message: '공부 목표를 작성해 주세요.' }),
    techStackInput: z.string().optional(),
    techStacks: z
      .array(z.string().min(1, { message: '기술 스택을 입력해 주세요.' }))
      .min(1, { message: '기술 스택을 하나 이상 선택해 주세요.' }),
    profileImage: z.string().min(1, { message: '프로필 이미지를 선택해 주세요.' }),
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

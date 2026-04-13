import { z } from "zod/v4";

export const loginSchema = z.object({
  email: z.email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上です"),
});

export const registerSchema = z
  .object({
    email: z.email("有効なメールアドレスを入力してください"),
    password: z.string().min(8, "パスワードは8文字以上です"),
    confirmPassword: z.string(),
    fullName: z.string().min(1, "名前を入力してください"),
    role: z.enum(["student", "coach"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

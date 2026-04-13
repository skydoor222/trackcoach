import { z } from "zod/v4";

export const bookingSchema = z.object({
  coachId: z.string().uuid(),
  date: z.string().min(1, "日付を選択してください"),
  startTime: z.string().min(1, "開始時間を選択してください"),
  duration: z.number().min(30).max(480),
  message: z.string().max(500).optional(),
  circuitId: z.string().optional(),
});

export const reviewSchema = z.object({
  bookingId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, "10文字以上のコメントを入力してください").max(1000),
});

export type BookingInput = z.infer<typeof bookingSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;

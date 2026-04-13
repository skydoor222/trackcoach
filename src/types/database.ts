export type UserRole = "student" | "coach" | "admin";
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "disputed";
export type PaymentStatus =
  | "pending"
  | "held"
  | "released"
  | "refunded";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  role: UserRole;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface CoachProfile {
  id: string;
  user_id: string;
  license_number: string | null;
  experience_years: number;
  specialties: string[];
  circuits: string[];
  hourly_rate: number;
  rating_average: number;
  review_count: number;
  stripe_account_id: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  // Joined
  profile?: Profile;
}

export interface Booking {
  id: string;
  student_id: string;
  coach_id: string;
  date: string;
  start_time: string;
  duration: number;
  status: BookingStatus;
  payment_status: PaymentStatus;
  amount: number;
  platform_fee: number;
  message: string | null;
  circuit: string | null;
  stripe_payment_intent_id: string | null;
  created_at: string;
  updated_at: string;
  // Joined
  student?: Profile;
  coach?: Profile;
  coach_profile?: CoachProfile;
}

export interface Review {
  id: string;
  booking_id: string;
  reviewer_id: string;
  coach_id: string;
  rating: number;
  comment: string;
  created_at: string;
  // Joined
  reviewer?: Profile;
}

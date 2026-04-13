-- TrackCoach 初期スキーマ

-- プロフィールテーブル
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text not null,
  avatar_url text,
  role text not null default 'student' check (role in ('student', 'coach', 'admin')),
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "プロフィールは誰でも閲覧可" on public.profiles
  for select using (true);

create policy "自分のプロフィールのみ更新可" on public.profiles
  for update using (auth.uid() = id);

create policy "自分のプロフィールのみ挿入可" on public.profiles
  for insert with check (auth.uid() = id);

-- Auth トリガー: ユーザー作成時にプロフィールを自動作成
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'role', 'student')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- コーチプロフィールテーブル
create table public.coach_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade unique,
  license_number text,
  experience_years integer not null default 0,
  specialties text[] not null default '{}',
  circuits text[] not null default '{}',
  hourly_rate integer not null default 0,
  rating_average numeric(3,2) not null default 0,
  review_count integer not null default 0,
  stripe_account_id text,
  is_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.coach_profiles enable row level security;

create policy "コーチプロフィールは誰でも閲覧可" on public.coach_profiles
  for select using (true);

create policy "自分のコーチプロフィールのみ更新可" on public.coach_profiles
  for update using (auth.uid() = user_id);

create policy "自分のコーチプロフィールのみ挿入可" on public.coach_profiles
  for insert with check (auth.uid() = user_id);

-- 予約テーブル
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id),
  coach_id uuid not null references public.profiles(id),
  date date not null,
  start_time text not null,
  duration integer not null check (duration >= 30 and duration <= 480),
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'completed', 'cancelled', 'disputed')),
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'held', 'released', 'refunded')),
  amount integer not null default 0,
  platform_fee integer not null default 0,
  message text,
  circuit text,
  stripe_payment_intent_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.bookings enable row level security;

create policy "予約は当事者のみ閲覧可" on public.bookings
  for select using (auth.uid() = student_id or auth.uid() = coach_id);

create policy "生徒のみ予約作成可" on public.bookings
  for insert with check (auth.uid() = student_id);

create policy "当事者のみ予約更新可" on public.bookings
  for update using (auth.uid() = student_id or auth.uid() = coach_id);

-- レビューテーブル
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) unique,
  reviewer_id uuid not null references public.profiles(id),
  coach_id uuid not null references public.profiles(id),
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text not null,
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;

create policy "レビューは誰でも閲覧可" on public.reviews
  for select using (true);

create policy "完了した予約の生徒のみレビュー作成可" on public.reviews
  for insert with check (
    auth.uid() = reviewer_id
    and exists (
      select 1 from public.bookings
      where bookings.id = booking_id
      and bookings.student_id = auth.uid()
      and bookings.status = 'completed'
    )
  );

-- インデックス
create index idx_coach_profiles_user_id on public.coach_profiles(user_id);
create index idx_bookings_student_id on public.bookings(student_id);
create index idx_bookings_coach_id on public.bookings(coach_id);
create index idx_bookings_date on public.bookings(date);
create index idx_reviews_coach_id on public.reviews(coach_id);

-- updated_at 自動更新トリガー
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.update_updated_at();

create trigger update_coach_profiles_updated_at
  before update on public.coach_profiles
  for each row execute procedure public.update_updated_at();

create trigger update_bookings_updated_at
  before update on public.bookings
  for each row execute procedure public.update_updated_at();

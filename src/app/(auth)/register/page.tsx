"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Gauge, BookOpen } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterInput>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    role: "student",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = registerSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path.join(".");
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.fullName,
          role: form.role,
        },
      },
    });

    if (error) {
      setErrors({ form: error.message });
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  const update = (field: keyof RegisterInput, value: string) =>
    setForm({ ...form, [field]: value });

  return (
    <div className="flex min-h-screen">
      {/* Left — Form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="flex items-center gap-2 mb-10">
            <div className="h-8 w-8 rounded-lg bg-navy-900 flex items-center justify-center">
              <span className="text-sm font-black text-white tracking-tighter">TC</span>
            </div>
            <span className="text-lg font-bold text-navy-900">TrackCoach</span>
          </Link>

          <h1 className="text-2xl font-bold text-navy-900">新規登録</h1>
          <p className="mt-2 text-sm text-slate-500">
            アカウントを作成してTrackCoachを始めましょう
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {errors.form && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
                <p className="text-sm text-red-700">{errors.form}</p>
              </div>
            )}

            {/* Role Selection — Cards */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-800">
                アカウントタイプ
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => update("role", "student")}
                  className={`flex flex-col items-center gap-2 rounded-xl border-2 px-4 py-4 transition-all duration-200 ${
                    form.role === "student"
                      ? "border-navy-900 bg-navy-900/5 ring-1 ring-navy-900/10"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <BookOpen
                    className={`h-5 w-5 ${
                      form.role === "student"
                        ? "text-navy-900"
                        : "text-slate-400"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      form.role === "student"
                        ? "text-navy-900"
                        : "text-slate-600"
                    }`}
                  >
                    生徒として
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => update("role", "coach")}
                  className={`flex flex-col items-center gap-2 rounded-xl border-2 px-4 py-4 transition-all duration-200 ${
                    form.role === "coach"
                      ? "border-racing-red bg-racing-red/5 ring-1 ring-racing-red/10"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <Gauge
                    className={`h-5 w-5 ${
                      form.role === "coach"
                        ? "text-racing-red"
                        : "text-slate-400"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      form.role === "coach"
                        ? "text-racing-red-dark"
                        : "text-slate-600"
                    }`}
                  >
                    コーチとして
                  </span>
                </button>
              </div>
            </div>

            <Input
              id="fullName"
              label="名前"
              placeholder="山田 太郎"
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              error={errors.fullName}
            />
            <Input
              id="email"
              label="メールアドレス"
              type="email"
              placeholder="email@example.com"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              error={errors.email}
            />
            <Input
              id="password"
              label="パスワード"
              type="password"
              placeholder="8文字以上"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              error={errors.password}
            />
            <Input
              id="confirmPassword"
              label="パスワード確認"
              type="password"
              placeholder="もう一度入力"
              value={form.confirmPassword}
              onChange={(e) => update("confirmPassword", e.target.value)}
              error={errors.confirmPassword}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "登録中..." : "アカウントを作成"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            既にアカウントをお持ちの方は{" "}
            <Link
              href="/login"
              className="font-semibold text-navy-700 hover:text-navy-900 transition-colors"
            >
              ログイン
            </Link>
          </p>
        </div>
      </div>

      {/* Right — Visual Panel (desktop only) */}
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center bg-navy-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-racing-red/10 rounded-full blur-3xl" />
        <div className="relative text-center px-12">
          <div className="mx-auto h-20 w-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
            <span className="text-3xl font-black text-white tracking-tighter">TC</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            ドライビングスキルを
            <br />
            次のレベルへ
          </h2>
          <p className="mt-3 text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
            プロレーシングドライバーによるマンツーマンコーチングで、確実にタイムアップ。
          </p>
        </div>
      </div>
    </div>
  );
}

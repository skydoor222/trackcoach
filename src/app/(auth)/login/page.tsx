"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [form, setForm] = useState<LoginInput>({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse(form);
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
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setErrors({ form: "メールアドレスまたはパスワードが正しくありません" });
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

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

          <h1 className="text-2xl font-bold text-navy-900">ログイン</h1>
          <p className="mt-2 text-sm text-slate-500">
            アカウントにログインしてください
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {errors.form && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
                <p className="text-sm text-red-700">{errors.form}</p>
              </div>
            )}
            <Input
              id="email"
              label="メールアドレス"
              type="email"
              placeholder="email@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
            />
            <Input
              id="password"
              label="パスワード"
              type="password"
              placeholder="8文字以上"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={errors.password}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "ログイン中..." : "ログイン"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            アカウントをお持ちでない方は{" "}
            <Link
              href="/register"
              className="font-semibold text-navy-700 hover:text-navy-900 transition-colors"
            >
              新規登録
            </Link>
          </p>
        </div>
      </div>

      {/* Right — Visual Panel (desktop only) */}
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center bg-navy-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-racing-red/10 rounded-full blur-3xl" />
        <div className="relative text-center px-12">
          <div className="mx-auto h-20 w-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
            <span className="text-3xl font-black text-white tracking-tighter">TC</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            おかえりなさい
          </h2>
          <p className="mt-3 text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
            ログインして、あなたのドライビングスキルを次のレベルへ。
          </p>
        </div>
      </div>
    </div>
  );
}

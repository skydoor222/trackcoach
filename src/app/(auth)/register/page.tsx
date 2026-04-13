"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/" className="text-2xl font-bold text-blue-600 mb-2 block">
            TrackCoach
          </Link>
          <CardTitle>新規登録</CardTitle>
          <CardDescription>アカウントを作成してください</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.form && (
              <p className="text-sm text-red-600 text-center">{errors.form}</p>
            )}
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
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                アカウントタイプ
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={form.role === "student"}
                    onChange={(e) => update("role", e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="text-sm">生徒として登録</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="coach"
                    checked={form.role === "coach"}
                    onChange={(e) => update("role", e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="text-sm">コーチとして登録</span>
                </label>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "登録中..." : "アカウントを作成"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">
            既にアカウントをお持ちの方は{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              ログイン
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

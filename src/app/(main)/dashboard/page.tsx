import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, BookOpen, Star, DollarSign } from "lucide-react";

export const metadata = {
  title: "ダッシュボード | TrackCoach",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { count: bookingCount } = await supabase
    .from("bookings")
    .select("*", { count: "exact", head: true })
    .or(`student_id.eq.${user.id},coach_id.eq.${user.id}`);

  const { count: upcomingCount } = await supabase
    .from("bookings")
    .select("*", { count: "exact", head: true })
    .or(`student_id.eq.${user.id},coach_id.eq.${user.id}`)
    .eq("status", "confirmed")
    .gte("date", new Date().toISOString().split("T")[0]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">
        ようこそ、{profile?.full_name ?? "ユーザー"}さん
      </h1>
      <p className="mt-2 text-gray-500">
        {profile?.role === "coach"
          ? "コーチダッシュボード"
          : "マイダッシュボード"}
      </p>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <CalendarDays className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">次の予約</p>
              <p className="text-2xl font-bold">{upcomingCount ?? 0}件</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">総予約数</p>
              <p className="text-2xl font-bold">{bookingCount ?? 0}件</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">評価</p>
              <p className="text-2xl font-bold">-</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">
                {profile?.role === "coach" ? "売上" : "利用額"}
              </p>
              <p className="text-2xl font-bold">-</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder for upcoming bookings */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>直近の予約</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            予約がありません。コーチを検索して予約しましょう。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

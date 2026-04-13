import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import {
  CalendarDays,
  BookOpen,
  Star,
  TrendingUp,
  ArrowRight,
  Search,
} from "lucide-react";

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

  const stats = [
    {
      label: "次の予約",
      value: `${upcomingCount ?? 0}件`,
      icon: CalendarDays,
      color: "bg-navy-900/10 text-navy-700",
      iconColor: "text-navy-700",
    },
    {
      label: "総予約数",
      value: `${bookingCount ?? 0}件`,
      icon: BookOpen,
      color: "bg-teal-500/10 text-teal-700",
      iconColor: "text-teal-600",
    },
    {
      label: "評価",
      value: "-",
      icon: Star,
      color: "bg-amber-500/10 text-amber-700",
      iconColor: "text-amber-500",
    },
    {
      label: profile?.role === "coach" ? "売上" : "利用額",
      value: "-",
      icon: TrendingUp,
      color: "bg-racing-red/10 text-racing-red-dark",
      iconColor: "text-racing-red",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">
            ようこそ、{profile?.full_name ?? "ユーザー"}さん
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {profile?.role === "coach"
              ? "コーチダッシュボード"
              : "マイダッシュボード"}
          </p>
        </div>
        <Link
          href="/coaches"
          className={buttonVariants({ size: "sm", className: "gap-1.5" })}
        >
          <Search className="h-3.5 w-3.5" />
          コーチを探す
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div
                className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${stat.color}`}
              >
                <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
              <div>
                <p className="text-xs text-slate-500">{stat.label}</p>
                <p className="text-xl font-bold text-navy-900">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Bookings */}
      <Card className="mt-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">直近の予約</CardTitle>
            <Link
              href="/bookings"
              className="flex items-center gap-1 text-sm font-medium text-navy-700 hover:text-navy-900 transition-colors"
            >
              全て見る
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border-2 border-dashed border-slate-200 px-6 py-10 text-center">
            <CalendarDays className="mx-auto h-8 w-8 text-slate-300" />
            <p className="mt-3 text-sm font-medium text-slate-600">
              予約がありません
            </p>
            <p className="mt-1 text-xs text-slate-400">
              コーチを検索して予約しましょう
            </p>
            <Link
              href="/coaches"
              className={buttonVariants({
                size: "sm",
                className: "mt-4",
              })}
            >
              コーチを探す
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

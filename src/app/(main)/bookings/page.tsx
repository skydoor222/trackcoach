import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CalendarDays, MapPin } from "lucide-react";
import type { Booking, BookingStatus } from "@/types";

export const metadata = {
  title: "予約一覧 | TrackCoach",
};

const statusLabel: Record<BookingStatus, string> = {
  pending: "承認待ち",
  confirmed: "確定",
  completed: "完了",
  cancelled: "キャンセル",
  disputed: "紛争中",
};

const statusVariant: Record<
  BookingStatus,
  "default" | "success" | "warning" | "destructive" | "secondary"
> = {
  pending: "warning",
  confirmed: "default",
  completed: "success",
  cancelled: "secondary",
  disputed: "destructive",
};

export default async function BookingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*, student:profiles!student_id(*), coach:profiles!coach_id(*)")
    .or(`student_id.eq.${user.id},coach_id.eq.${user.id}`)
    .order("date", { ascending: false });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy-900">予約一覧</h1>
        <p className="mt-1 text-sm text-slate-500">
          あなたの予約履歴と今後の予約を確認できます
        </p>
      </div>

      <div className="space-y-3">
        {bookings && bookings.length > 0 ? (
          bookings.map((booking: Booking) => {
            const isCoach = booking.coach_id === user.id;
            const otherParty = isCoach ? booking.student : booking.coach;
            return (
              <Card key={booking.id} className="group">
                <CardContent className="flex items-center justify-between p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-navy-900/5">
                      <CalendarDays className="h-5 w-5 text-navy-700" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-navy-900">
                          {isCoach ? "生徒" : "コーチ"}:{" "}
                          {otherParty?.full_name}
                        </h3>
                        <Badge variant={statusVariant[booking.status]}>
                          {statusLabel[booking.status]}
                        </Badge>
                      </div>
                      <div className="mt-1 flex items-center gap-3 text-sm text-slate-500">
                        <span>
                          {formatDate(booking.date)} {booking.start_time}
                        </span>
                        <span className="text-slate-300">|</span>
                        <span>{booking.duration}分</span>
                        {booking.circuit && (
                          <>
                            <span className="text-slate-300">|</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {booking.circuit}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-navy-900">
                      {formatCurrency(booking.amount)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 px-6 py-16 text-center">
            <CalendarDays className="mx-auto h-10 w-10 text-slate-300" />
            <p className="mt-3 font-medium text-slate-600">予約がありません</p>
            <p className="mt-1 text-sm text-slate-400">
              コーチを検索して最初の予約をしましょう
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

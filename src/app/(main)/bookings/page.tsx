import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
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

const statusVariant: Record<BookingStatus, "default" | "success" | "warning" | "destructive" | "secondary"> = {
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
      <h1 className="text-3xl font-bold text-gray-900">予約一覧</h1>
      <p className="mt-2 text-gray-500">
        あなたの予約履歴と今後の予約を確認できます
      </p>

      <div className="mt-8 space-y-4">
        {bookings && bookings.length > 0 ? (
          bookings.map((booking: Booking) => {
            const isCoach = booking.coach_id === user.id;
            const otherParty = isCoach ? booking.student : booking.coach;
            return (
              <Card key={booking.id}>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">
                        {isCoach ? "生徒" : "コーチ"}: {otherParty?.full_name}
                      </h3>
                      <Badge variant={statusVariant[booking.status]}>
                        {statusLabel[booking.status]}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {formatDate(booking.date)} {booking.start_time} ・{" "}
                      {booking.duration}分
                    </p>
                    {booking.circuit && (
                      <p className="text-sm text-gray-500">
                        サーキット: {booking.circuit}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">
                      {formatCurrency(booking.amount)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">予約がありません</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

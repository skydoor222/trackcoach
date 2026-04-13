import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { StarRating } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { MapPin, Clock, Award, MessageSquare } from "lucide-react";

export default async function CoachDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: coach } = await supabase
    .from("coach_profiles")
    .select("*, profile:profiles(*)")
    .eq("user_id", id)
    .single();

  if (!coach) notFound();

  const { data: reviews } = await supabase
    .from("reviews")
    .select("*, reviewer:profiles(*)")
    .eq("coach_id", id)
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-navy-900 via-navy-700 to-racing-red" />
        <CardContent className="p-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <Avatar
              src={coach.profile?.avatar_url ?? null}
              alt={coach.profile?.full_name ?? "コーチ"}
              size="xl"
            />
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-2xl font-bold text-navy-900">
                  {coach.profile?.full_name}
                </h1>
                {coach.is_verified && (
                  <Badge variant="success">認定コーチ</Badge>
                )}
              </div>
              <div className="mt-2 flex items-center gap-2 justify-center sm:justify-start">
                <StarRating rating={coach.rating_average} size={18} />
                <span className="text-sm text-slate-500">
                  {coach.rating_average.toFixed(1)} ({coach.review_count}件)
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500 justify-center sm:justify-start">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-slate-400" />
                  経験 {coach.experience_years} 年
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-slate-400" />
                  {coach.license_number ?? "ライセンス未登録"}
                </span>
              </div>
              {coach.profile?.bio && (
                <p className="mt-4 text-slate-600 leading-relaxed">
                  {coach.profile.bio}
                </p>
              )}
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center min-w-[180px]">
              <p className="text-3xl font-bold text-navy-900">
                {formatCurrency(coach.hourly_rate)}
              </p>
              <p className="text-sm text-slate-500">/ 時間</p>
              <Button variant="racing" className="mt-4 w-full" size="lg">
                予約する
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Specialties & Circuits */}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">専門分野</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {coach.specialties.map((s: string) => (
                <Badge key={s}>{s}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">対応サーキット</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {coach.circuits.map((c: string) => (
                <Badge key={c} variant="secondary">
                  <MapPin className="mr-1 h-3 w-3" />
                  {c}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews */}
      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageSquare className="h-4 w-4 text-slate-400" />
              レビュー
            </CardTitle>
            <span className="text-sm text-slate-500">
              {coach.review_count}件
            </span>
          </div>
        </CardHeader>
        <CardContent>
          {reviews && reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-slate-100 pb-5 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={review.reviewer?.avatar_url ?? null}
                      alt={review.reviewer?.full_name ?? "ユーザー"}
                      size="sm"
                    />
                    <div>
                      <p className="text-sm font-semibold text-navy-900">
                        {review.reviewer?.full_name}
                      </p>
                      <StarRating rating={review.rating} size={12} />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">まだレビューがありません</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

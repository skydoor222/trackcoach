import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { StarRating } from "@/components/ui/star-rating";
import { formatCurrency } from "@/lib/utils";
import type { CoachProfile } from "@/types";

export const metadata = {
  title: "コーチを探す | TrackCoach",
};

export default async function CoachesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; circuit?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("coach_profiles")
    .select("*, profile:profiles(*)")
    .eq("is_verified", true)
    .order("rating_average", { ascending: false });

  if (params.q) {
    query = query.or(
      `profile.full_name.ilike.%${params.q}%,specialties.cs.{${params.q}}`
    );
  }

  if (params.circuit) {
    query = query.contains("circuits", [params.circuit]);
  }

  const { data: coaches } = await query;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy-900">コーチを探す</h1>
        <p className="mt-2 text-slate-500">
          あなたに最適なドライビングコーチを見つけましょう
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <form className="flex gap-3" method="GET">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              name="q"
              defaultValue={params.q}
              placeholder="名前、専門分野で検索..."
              className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-colors"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 h-11 rounded-xl bg-navy-900 px-5 text-sm font-semibold text-white hover:bg-navy-800 transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4" />
            検索
          </button>
        </form>
      </div>

      {/* Results Count */}
      {coaches && coaches.length > 0 && (
        <p className="mb-6 text-sm text-slate-500">
          {coaches.length}名のコーチが見つかりました
        </p>
      )}

      {/* Coach Grid */}
      {coaches && coaches.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {coaches.map((coach: CoachProfile) => (
            <Link key={coach.id} href={`/coaches/${coach.user_id}`}>
              <Card className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar
                      src={coach.profile?.avatar_url ?? null}
                      alt={coach.profile?.full_name ?? "コーチ"}
                      size="lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-navy-900 truncate group-hover:text-navy-700 transition-colors">
                        {coach.profile?.full_name}
                      </h3>
                      <div className="mt-1 flex items-center gap-2">
                        <StarRating rating={coach.rating_average} size={14} />
                        <span className="text-xs text-slate-500">
                          ({coach.review_count})
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        経験 {coach.experience_years} 年
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {coach.specialties.slice(0, 3).map((s) => (
                      <Badge key={s} variant="secondary">
                        {s}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-lg font-bold text-navy-900">
                      {formatCurrency(coach.hourly_rate)}
                      <span className="text-xs font-normal text-slate-500">
                        /時間
                      </span>
                    </span>
                    {coach.is_verified && (
                      <Badge variant="success">認定</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 px-6 py-16 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <p className="text-slate-600 font-medium">
            条件に合うコーチが見つかりませんでした
          </p>
          <p className="mt-1 text-sm text-slate-400">
            検索条件を変更してお試しください
          </p>
        </div>
      )}
    </div>
  );
}

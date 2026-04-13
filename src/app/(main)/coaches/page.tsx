import Link from "next/link";
import { Search } from "lucide-react";
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">コーチを探す</h1>
        <p className="mt-2 text-gray-500">
          あなたに最適なドライビングコーチを見つけましょう
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <form className="flex gap-4" method="GET">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              name="q"
              defaultValue={params.q}
              placeholder="名前、専門分野で検索..."
              className="h-10 w-full rounded-md border border-gray-300 bg-white pl-10 pr-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="h-10 rounded-md bg-blue-600 px-6 text-sm font-medium text-white hover:bg-blue-700"
          >
            検索
          </button>
        </form>
      </div>

      {/* Coach List */}
      {coaches && coaches.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coaches.map((coach: CoachProfile) => (
            <Link key={coach.id} href={`/coaches/${coach.user_id}`}>
              <Card className="transition-shadow hover:shadow-md cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar
                      src={coach.profile?.avatar_url ?? null}
                      alt={coach.profile?.full_name ?? "コーチ"}
                      size="lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {coach.profile?.full_name}
                      </h3>
                      <div className="mt-1 flex items-center gap-2">
                        <StarRating rating={coach.rating_average} size={14} />
                        <span className="text-sm text-gray-500">
                          ({coach.review_count})
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        経験 {coach.experience_years} 年
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1">
                    {coach.specialties.slice(0, 3).map((s) => (
                      <Badge key={s} variant="secondary">
                        {s}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">
                      {formatCurrency(coach.hourly_rate)}/時間
                    </span>
                    {coach.is_verified && (
                      <Badge variant="success">認定コーチ</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">
            条件に合うコーチが見つかりませんでした
          </p>
        </div>
      )}
    </div>
  );
}

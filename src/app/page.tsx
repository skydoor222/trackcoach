import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Star,
  Users,
  Gauge,
  Trophy,
  CheckCircle,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-navy-950/95 backdrop-blur-lg border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
              <span className="text-sm font-black text-white tracking-tighter">TC</span>
            </div>
            <span className="text-lg font-bold text-white">TrackCoach</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Link
              href="/coaches"
              className="hidden sm:block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              コーチを探す
            </Link>
            <Link
              href="/login"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "text-slate-300 hover:text-white hover:bg-white/10",
              })}
            >
              ログイン
            </Link>
            <Link
              href="/register"
              className={buttonVariants({
                variant: "racing",
                size: "sm",
              })}
            >
              新規登録
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero — Dark Motorsport Theme */}
        <section className="relative bg-navy-950 overflow-hidden">
          {/* Background grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
          {/* Accent gradient */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-racing-red/5 to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-navy-500/10 to-transparent" />

          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
            <div className="max-w-3xl">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 mb-8">
                <div className="h-1.5 w-1.5 rounded-full bg-racing-red animate-pulse" />
                <span className="text-xs font-medium text-slate-300 tracking-wide">
                  プロドライバーのマッチングプラットフォーム
                </span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
                サーキットで、
                <br />
                <span className="text-racing-red">プロから学ぶ。</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-slate-400 leading-relaxed">
                経験豊富なプロレーシングドライバーがマンツーマンであなたのスキルアップをサポート。
                確実にタイムアップを実現します。
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link
                  href="/coaches"
                  className={buttonVariants({
                    variant: "racing",
                    size: "lg",
                    className: "gap-2",
                  })}
                >
                  コーチを探す
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/register"
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className:
                      "border-white/20 text-white hover:bg-white/10 hover:text-white",
                  })}
                >
                  コーチとして登録
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
                <div>
                  <p className="text-2xl font-bold text-white sm:text-3xl">100+</p>
                  <p className="mt-1 text-sm text-slate-500">認定コーチ</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white sm:text-3xl">15+</p>
                  <p className="mt-1 text-sm text-slate-500">対応サーキット</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white sm:text-3xl">98%</p>
                  <p className="mt-1 text-sm text-slate-500">満足度</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-racing-red">
                How it works
              </p>
              <h2 className="mt-2 text-3xl font-bold text-navy-900">
                3ステップで始められる
              </h2>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "コーチを検索",
                  desc: "サーキット・専門分野・予算からあなたに最適なコーチを見つけましょう。",
                  icon: Users,
                },
                {
                  step: "02",
                  title: "日程を予約",
                  desc: "コーチのスケジュールから希望の日時を選んで予約。エスクロー決済で安心。",
                  icon: Gauge,
                },
                {
                  step: "03",
                  title: "スキルアップ",
                  desc: "サーキットでマンツーマンのコーチングを受けて、確実にタイムアップ。",
                  icon: Trophy,
                },
              ].map((item) => (
                <div key={item.step} className="relative group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-white group-hover:bg-racing-red transition-colors duration-300">
                        <item.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Step {item.step}
                      </span>
                      <h3 className="mt-1 text-lg font-bold text-navy-900">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-racing-red">
                Features
              </p>
              <h2 className="mt-2 text-3xl font-bold text-navy-900">
                TrackCoachが選ばれる理由
              </h2>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: CheckCircle,
                  title: "厳選されたプロコーチ",
                  desc: "ライセンス・実績を審査済みのプロドライバーのみが登録。質の高いコーチングを保証します。",
                  color: "bg-navy-900",
                },
                {
                  icon: Shield,
                  title: "エスクロー決済",
                  desc: "コーチング完了まで代金はプラットフォームが安全に保管。トラブル時の返金もサポート。",
                  color: "bg-teal-600",
                },
                {
                  icon: Star,
                  title: "透明なレビュー",
                  desc: "受講者のリアルな評価とコメントで、あなたに最適なコーチを確実に選べます。",
                  color: "bg-amber-500",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-8 transition-shadow duration-200 hover:shadow-lg"
                >
                  <div
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${item.color}`}
                  >
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mt-5 text-base font-bold text-navy-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-navy-900 py-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-racing-red/10 rounded-full blur-3xl" />
          <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              今すぐ始めよう
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              無料アカウント登録で、すぐにコーチを探し始められます。
            </p>
            <div className="mt-10">
              <Link
                href="/register"
                className={buttonVariants({
                  variant: "racing",
                  size: "lg",
                  className: "gap-2",
                })}
              >
                無料で登録する
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

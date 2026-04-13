import Link from "next/link";
import { ArrowRight, Shield, Star, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-bold text-blue-600">
            TrackCoach
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/coaches"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              コーチを探す
            </Link>
            <Link href="/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              ログイン
            </Link>
            <Link href="/register" className={buttonVariants({ size: "sm" })}>
              新規登録
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 py-24 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              プロドライバーから学ぶ
              <br />
              最高のドライビング体験
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
              経験豊富なプロレーシングドライバーがあなたのスキルアップをサポート。
              サーキットでのマンツーマンコーチングで、確実にタイムアップ。
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/coaches" className={buttonVariants({ size: "lg", className: "bg-white text-blue-700 hover:bg-blue-50" })}>
                  コーチを探す
                  <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/register" className={buttonVariants({ size: "lg", variant: "outline", className: "border-white text-white hover:bg-white/10" })}>
                コーチとして登録
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold text-gray-900">
              TrackCoachの特徴
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  厳選されたコーチ
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  実績のあるプロドライバーのみが登録。安心してコーチングを受けられます。
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  安心のエスクロー決済
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  コーチング完了まで代金はプラットフォームが保管。安全な取引を保証します。
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  レビュー & 評価
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  受講者のリアルなレビューで、あなたに最適なコーチを見つけましょう。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900">
              今すぐ始めよう
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              無料アカウント登録で、すぐにコーチを探し始められます。
            </p>
            <div className="mt-8">
              <Link href="/register" className={buttonVariants({ size: "lg" })}>
                無料で登録する
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

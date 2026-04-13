import Link from "next/link";
import {
  ExternalLink,
  Home,
  LogIn,
  UserPlus,
  Search,
  User,
  CalendarDays,
  LayoutDashboard,
  GitBranch,
  Globe,
  Database,
  CreditCard,
  Mail,
} from "lucide-react";

/**
 * =========================================================
 * TrackCoach 画面・機能管理マップ
 * =========================================================
 *
 * このページは開発チーム（非エンジニア含む）がアプリの全画面と
 * 機能を一目で把握するための可視化ページです。
 *
 * 【画面の追加・削除方法】
 * 1. 下の `pages` 配列にオブジェクトを追加/削除する
 * 2. 実際のページファイルを src/app/ 以下に作成/削除する
 * 3. git commit & push で反映
 *
 * 【ステータスの意味】
 * - live:     実装済み・動作する
 * - wip:      開発中（ページは存在するが未完成）
 * - planned:  計画中（ページ未作成）
 * - disabled: 一時的に無効化
 */

type PageStatus = "live" | "wip" | "planned" | "disabled";

interface PageEntry {
  path: string;
  name: string;
  description: string;
  status: PageStatus;
  category: string;
  icon: React.ReactNode;
  auth: boolean; // ログイン必須か
}

// ─── ここを編集して画面を管理 ─────────────────────────────
const pages: PageEntry[] = [
  // === 公開ページ ===
  {
    path: "/",
    name: "トップページ（LP）",
    description: "ヒーロー、特徴紹介、CTA。未ログインユーザーの入口。",
    status: "live",
    category: "公開ページ",
    icon: <Home className="h-5 w-5" />,
    auth: false,
  },
  {
    path: "/coaches",
    name: "コーチ検索・一覧",
    description: "コーチをキーワード・サーキットで検索。カード形式で一覧表示。",
    status: "live",
    category: "公開ページ",
    icon: <Search className="h-5 w-5" />,
    auth: false,
  },
  {
    path: "/coaches/[id]",
    name: "コーチ詳細",
    description: "コーチのプロフィール、専門分野、レビュー、料金。予約ボタンあり。",
    status: "live",
    category: "公開ページ",
    icon: <User className="h-5 w-5" />,
    auth: false,
  },

  // === 認証ページ ===
  {
    path: "/login",
    name: "ログイン",
    description: "メール + パスワードでログイン。Zodバリデーション付き。",
    status: "live",
    category: "認証",
    icon: <LogIn className="h-5 w-5" />,
    auth: false,
  },
  {
    path: "/register",
    name: "新規登録",
    description: "生徒 or コーチとしてアカウント作成。登録後ダッシュボードへ。",
    status: "live",
    category: "認証",
    icon: <UserPlus className="h-5 w-5" />,
    auth: false,
  },

  // === 要ログインページ ===
  {
    path: "/dashboard",
    name: "ダッシュボード",
    description: "ログイン後のホーム。予約数、評価、売上/利用額の統計カード。",
    status: "live",
    category: "要ログイン",
    icon: <LayoutDashboard className="h-5 w-5" />,
    auth: true,
  },
  {
    path: "/bookings",
    name: "予約一覧",
    description: "自分の予約を時系列で表示。ステータス（承認待ち/確定/完了）付き。",
    status: "live",
    category: "要ログイン",
    icon: <CalendarDays className="h-5 w-5" />,
    auth: true,
  },

  // === 計画中 ===
  {
    path: "/bookings/new",
    name: "予約作成",
    description: "コーチを選んで日時・サーキットを指定して予約。Stripe決済。",
    status: "planned",
    category: "要ログイン",
    icon: <CreditCard className="h-5 w-5" />,
    auth: true,
  },
  {
    path: "/profile/edit",
    name: "プロフィール編集",
    description: "自分のプロフィール（名前、アバター、bio）を編集。",
    status: "planned",
    category: "要ログイン",
    icon: <User className="h-5 w-5" />,
    auth: true,
  },
  {
    path: "/coach/settings",
    name: "コーチ設定",
    description: "コーチ専用。料金、専門分野、対応サーキット、Stripe Connect連携。",
    status: "planned",
    category: "コーチ専用",
    icon: <CreditCard className="h-5 w-5" />,
    auth: true,
  },
];
// ─── ここまで ─────────────────────────────────────────────

const statusConfig: Record<
  PageStatus,
  { label: string; color: string; bg: string }
> = {
  live: { label: "稼働中", color: "text-green-700", bg: "bg-green-100" },
  wip: { label: "開発中", color: "text-yellow-700", bg: "bg-yellow-100" },
  planned: { label: "計画中", color: "text-blue-700", bg: "bg-blue-100" },
  disabled: { label: "無効", color: "text-gray-500", bg: "bg-gray-100" },
};

const GITHUB_REPO = "https://github.com/skydoor222/trackcoach";

export default function SitemapPage() {
  const categories = [...new Set(pages.map((p) => p.category))];
  const stats = {
    total: pages.length,
    live: pages.filter((p) => p.status === "live").length,
    wip: pages.filter((p) => p.status === "wip").length,
    planned: pages.filter((p) => p.status === "planned").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                TrackCoach 画面・機能マップ
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                アプリ上の全画面と機能を一覧で管理。追加・削除はこのファイルの
                <code className="mx-1 rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono">
                  pages
                </code>
                配列を編集するだけ。
              </p>
            </div>
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <GitBranch className="h-4 w-4" />
              GitHub
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-4 gap-4">
            <div className="rounded-lg bg-gray-900 px-4 py-3 text-center">
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-xs text-gray-400">全画面数</p>
            </div>
            <div className="rounded-lg bg-green-50 px-4 py-3 text-center">
              <p className="text-2xl font-bold text-green-700">{stats.live}</p>
              <p className="text-xs text-green-600">稼働中</p>
            </div>
            <div className="rounded-lg bg-yellow-50 px-4 py-3 text-center">
              <p className="text-2xl font-bold text-yellow-700">{stats.wip}</p>
              <p className="text-xs text-yellow-600">開発中</p>
            </div>
            <div className="rounded-lg bg-blue-50 px-4 py-3 text-center">
              <p className="text-2xl font-bold text-blue-700">
                {stats.planned}
              </p>
              <p className="text-xs text-blue-600">計画中</p>
            </div>
          </div>
        </div>
      </header>

      {/* External Services */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <h2 className="mb-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">
          外部サービス
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border bg-white p-3 hover:shadow-sm"
          >
            <GitBranch className="h-5 w-5 text-gray-700" />
            <div>
              <p className="text-sm font-medium">GitHub</p>
              <p className="text-xs text-gray-500">ソースコード</p>
            </div>
            <ExternalLink className="ml-auto h-3 w-3 text-gray-400" />
          </a>
          <a
            href="https://supabase.com/dashboard/project/pbssvingosjxhkpaavyo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border bg-white p-3 hover:shadow-sm"
          >
            <Database className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium">Supabase</p>
              <p className="text-xs text-gray-500">DB / Auth / Storage</p>
            </div>
            <ExternalLink className="ml-auto h-3 w-3 text-gray-400" />
          </a>
          <div className="flex items-center gap-3 rounded-lg border bg-white p-3 opacity-50">
            <CreditCard className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-sm font-medium">Stripe</p>
              <p className="text-xs text-gray-500">決済（未設定）</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border bg-white p-3 opacity-50">
            <Mail className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium">Resend</p>
              <p className="text-xs text-gray-500">メール（未設定）</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pages by Category */}
      <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        {categories.map((category) => (
          <div key={category} className="mt-8">
            <h2 className="mb-4 text-lg font-bold text-gray-900">
              {category}
            </h2>
            <div className="space-y-3">
              {pages
                .filter((p) => p.category === category)
                .map((page) => {
                  const st = statusConfig[page.status];
                  const isClickable = page.status === "live" || page.status === "wip";
                  const cls = `flex items-center gap-4 rounded-lg border bg-white p-4 transition-shadow ${
                    isClickable ? "hover:shadow-md cursor-pointer" : "opacity-70"
                  }`;
                  const inner = (
                    <>
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                        {page.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">
                            {page.name}
                          </h3>
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${st.bg} ${st.color}`}
                          >
                            {st.label}
                          </span>
                          {page.auth && (
                            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                              要ログイン
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500 truncate">
                          {page.description}
                        </p>
                      </div>
                      <div className="hidden sm:block">
                        <code className="rounded bg-gray-100 px-2 py-1 text-xs font-mono text-gray-600">
                          {page.path}
                        </code>
                      </div>
                      {isClickable && (
                        <ExternalLink className="h-4 w-4 text-gray-400" />
                      )}
                    </>
                  );

                  return isClickable ? (
                    <Link key={page.path} href={page.path} className={cls}>
                      {inner}
                    </Link>
                  ) : (
                    <div key={page.path} className={cls}>
                      {inner}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="border-t bg-white py-6">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500">
            このページは
            <code className="mx-1 rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono">
              src/app/dev/sitemap/page.tsx
            </code>
            で管理されています。画面を追加・削除するには{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono">
              pages
            </code>{" "}
            配列を編集してください。
          </p>
          <div className="mt-3 flex items-center justify-center gap-4">
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline flex items-center gap-1"
            >
              <GitBranch className="h-3 w-3" />
              GitHub で編集
            </a>
            <span className="text-gray-300">|</span>
            <Link
              href="/"
              className="text-sm text-blue-600 hover:underline flex items-center gap-1"
            >
              <Globe className="h-3 w-3" />
              アプリに戻る
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

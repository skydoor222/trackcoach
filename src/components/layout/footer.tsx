import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-navy-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-xs font-black text-white tracking-tighter">TC</span>
              </div>
              <span className="text-base font-bold text-white">TrackCoach</span>
            </div>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              プロドライバーから学ぶ、
              <br />
              最高のドライビング体験
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              サービス
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/coaches"
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  コーチを探す
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  コーチとして登録
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              サポート
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  利用規約
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} TrackCoach. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">TrackCoach</h3>
            <p className="mt-2 text-sm text-gray-500">
              プロドライバーから学ぶ、最高のドライビング体験
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">サービス</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/coaches" className="text-sm text-gray-500 hover:text-gray-900">
                  コーチを探す
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-sm text-gray-500 hover:text-gray-900">
                  コーチとして登録
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">サポート</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-4 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} TrackCoach. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

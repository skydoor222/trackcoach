"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, LogOut, User, ChevronDown } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button, buttonVariants } from "@/components/ui/button";
import type { Profile } from "@/types";

interface HeaderProps {
  user: Profile | null;
}

export function Header({ user }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-navy-900 flex items-center justify-center">
            <span className="text-sm font-black text-white tracking-tighter">TC</span>
          </div>
          <span className="text-lg font-bold text-navy-900 group-hover:text-navy-700 transition-colors">
            TrackCoach
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/coaches"
            className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-navy-900 hover:bg-slate-100 transition-colors"
          >
            コーチを探す
          </Link>
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-navy-900 hover:bg-slate-100 transition-colors"
              >
                ダッシュボード
              </Link>
              <Link
                href="/bookings"
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-navy-900 hover:bg-slate-100 transition-colors"
              >
                予約一覧
              </Link>
              {/* User Dropdown */}
              <div className="relative ml-2">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-slate-100 transition-colors"
                >
                  <div className="h-7 w-7 rounded-full bg-navy-900/10 flex items-center justify-center">
                    <User className="h-3.5 w-3.5 text-navy-700" />
                  </div>
                  <span className="text-sm font-medium text-slate-800">
                    {user.full_name}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                </button>
                {dropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setDropdownOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-1 z-20 w-48 rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        マイページ
                      </Link>
                      <div className="my-1 border-t border-slate-100" />
                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        ログアウト
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <Link
                href="/login"
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                ログイン
              </Link>
              <Link
                href="/register"
                className={buttonVariants({ size: "sm" })}
              >
                新規登録
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden rounded-lg p-2 hover:bg-slate-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
        >
          {menuOpen ? (
            <X className="h-5 w-5 text-slate-700" />
          ) : (
            <Menu className="h-5 w-5 text-slate-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1">
          <Link
            href="/coaches"
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            onClick={() => setMenuOpen(false)}
          >
            コーチを探す
          </Link>
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                onClick={() => setMenuOpen(false)}
              >
                ダッシュボード
              </Link>
              <Link
                href="/bookings"
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                onClick={() => setMenuOpen(false)}
              >
                予約一覧
              </Link>
              <div className="my-1 border-t border-slate-100" />
              <button
                onClick={handleSignOut}
                className="block w-full text-left rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                ログアウト
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                onClick={() => setMenuOpen(false)}
              >
                ログイン
              </Link>
              <div className="pt-2">
                <Link
                  href="/register"
                  className={buttonVariants({ className: "w-full" })}
                  onClick={() => setMenuOpen(false)}
                >
                  新規登録
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
}

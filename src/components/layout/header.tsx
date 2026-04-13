"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button, buttonVariants } from "@/components/ui/button";
import type { Profile } from "@/types";

interface HeaderProps {
  user: Profile | null;
}

export function Header({ user }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold text-blue-600">
          TrackCoach
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/coaches"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            コーチを探す
          </Link>
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                ダッシュボード
              </Link>
              <Link
                href="/bookings"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                予約一覧
              </Link>
              <div className="flex items-center gap-2">
                <Link href="/dashboard" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                    <User className="h-4 w-4 mr-1" />
                    {user.full_name}
                </Link>
                <Button variant="ghost" size="icon" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                ログイン
              </Link>
              <Link href="/register" className={buttonVariants({ size: "sm" })}>
                新規登録
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-3">
          <Link
            href="/coaches"
            className="block text-sm font-medium text-gray-600"
            onClick={() => setMenuOpen(false)}
          >
            コーチを探す
          </Link>
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="block text-sm font-medium text-gray-600"
                onClick={() => setMenuOpen(false)}
              >
                ダッシュボード
              </Link>
              <Link
                href="/bookings"
                className="block text-sm font-medium text-gray-600"
                onClick={() => setMenuOpen(false)}
              >
                予約一覧
              </Link>
              <button
                onClick={handleSignOut}
                className="block text-sm font-medium text-red-600"
              >
                ログアウト
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block text-sm font-medium text-gray-600"
                onClick={() => setMenuOpen(false)}
              >
                ログイン
              </Link>
              <Link
                href="/register"
                className="block text-sm font-medium text-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                新規登録
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

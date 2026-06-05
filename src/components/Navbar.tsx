"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
   <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-cyan-500/10 bg-[#020817]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-cyan-500/20">
              <div className="absolute inset-0 rounded-xl bg-cyan-500/10 blur-md" />
              <span className="relative text-cyan-400 font-bold">P</span>
            </div>

            <div>
              <h1 className="text-lg font-bold text-white">PulseMeet</h1>

              <p className="text-xs text-slate-500">Build • Connect • Grow</p>
            </div>
          </Link>

          {session ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <p className="text-sm text-white">{session.user?.name}</p>
                <p className="text-xs text-slate-400">{session.user?.role}</p>
              </div>

              {session.user?.role === "HOST" ? (
                <Link
                  href="/dashboard"
                  className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300 transition hover:bg-cyan-500/20"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/attendee/my-events"
                  className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 text-sm text-emerald-300 transition hover:bg-emerald-500/20"
                >
                  My Events
                </Link>
              )}

              <button
                onClick={handleSignOut}
                className="rounded-xl bg-white px-5 py-2 text-sm font-medium text-black transition hover:scale-105"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="rounded-xl border border-white/10 px-5 py-2 text-sm text-slate-300 transition hover:border-cyan-400/30 hover:text-white"
              >
                Sign In
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:scale-105"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role: isHost ? "HOST" : "ATTENDEE",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed");
      } else {
        toast.success("Registration successful! Please login.");
        router.push("/login");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[85vh] items-center justify-center px-4 pt-10 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute left-[-150px] top-[20%] h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="absolute right-[-150px] bottom-[10%] h-[350px] w-[350px] rounded-full bg-teal-500/10 blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
        relative
        w-full
        max-w-md
        overflow-hidden
        rounded-[32px]
        border
        border-cyan-500/15
        bg-[#08111f]
        shadow-[0_10px_40px_rgba(0,0,0,0.35)]
      "
      >
        <div className="h-[3px] bg-gradient-to-r from-cyan-400 via-cyan-500 to-teal-400" />

        <div className="p-8">
          <div className="mb-8 text-center">
            <div className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
              Join PulseMeet
            </div>

            <h1 className="mt-4 text-5xl font-bold text-white">
              Create
              <span className="text-cyan-400"> Account</span>
            </h1>

            <p className="mt-3 text-slate-400">
              Start hosting and attending events today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-slate-300">Full Name</label>

              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="mt-2 w-full rounded-2xl border border-cyan-500/10 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/40"
              />
            </div>

            <div>
              <label className="text-sm text-slate-300">Email</label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-2 w-full rounded-2xl border border-cyan-500/10 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/40"
              />
            </div>

            <div>
              <label className="text-sm text-slate-300">Password</label>

              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create password"
                  className="w-full rounded-2xl border border-cyan-500/10 bg-slate-900/50 px-4 py-3 pr-12 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/40"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-cyan-500/10 bg-cyan-500/[0.03] p-3">
              <input
                type="checkbox"
                checked={isHost}
                onChange={(e) => setIsHost(e.target.checked)}
                className="h-4 w-4"
              />

              <label className="text-sm text-slate-300">
                Register as Host (Create Events)
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
              w-full
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-teal-500
              py-3.5
              font-semibold
              text-slate-950
              shadow-lg
              shadow-cyan-500/20
            "
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-cyan-400 hover:text-cyan-300"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

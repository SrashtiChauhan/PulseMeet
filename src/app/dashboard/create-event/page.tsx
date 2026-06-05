"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    cutoffDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        cutoffDate: formData.cutoffDate
          ? new Date(formData.cutoffDate).toISOString()
          : undefined,
      };

      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create event");
      }

      toast.success("Event created successfully!");
      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  const inputStyle =
    "mt-2 w-full rounded-2xl border border-cyan-500/10 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-500/10";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        {/* FORM */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.25,
            duration: 0.6,
            ease: "easeOut",
          }}
          className="
      relative
      overflow-hidden
      rounded-[32px]
      border
      border-cyan-500/15
      bg-[#08111f]
      p-8
      md:p-10
    "
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-teal-500/[0.03]" />

          <div className="relative">
            <Link
              href="/dashboard"
              className="
        mb-6
        inline-flex
        items-center
        gap-2
        text-sm
        text-slate-400
        hover:text-cyan-300
        transition-colors
      "
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            {/* FORM  */}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Event Title */}
              <div>
                <label className="block text-sm font-medium text-white">
                  Event Title <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. AI Innovation Hackathon 2026"
                  className={inputStyle}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-white">
                  Description <span className="text-red-500">*</span>
                </label>

                <textarea
                  name="description"
                  rows={5}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your event..."
                  className={`${inputStyle} resize-none`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white">
                    Date <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white">
                    Time <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Location <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Google Meet, Zoom, Lab Block A, Auditorium..."
                  className={inputStyle}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white">
                    Capacity (Optional)
                  </label>

                  <input
                    type="number"
                    name="capacity"
                    min="1"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="Unlimited if empty"
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white">
                    Registration Cutoff (Optional)
                  </label>

                  <input
                    type="datetime-local"
                    name="cutoffDate"
                    value={formData.cutoffDate}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="
      rounded-2xl
      border
      border-white/10
      bg-white/5
      px-6
      py-3
      text-white
      transition-all
      hover:bg-white/10
    "
                >
                  Cancel
                </button>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  type="submit"
                  disabled={loading}
                  className="
      rounded-2xl
      bg-gradient-to-r
      from-cyan-500
      to-teal-500
      px-8
      py-3
      font-semibold
      text-slate-950
      shadow-lg
      shadow-cyan-500/20
    "
                >
                  {loading ? "Creating..." : "Create Event"}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* LIVE PREVIEW */}
        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.4,
            duration: 0.6,
          }}
          className="
      h-fit
      rounded-[32px]
      border
      border-cyan-500/15
      bg-[#08111f]
      overflow-hidden
      sticky
      top-24
    "
        >
          <div className="h-[3px] bg-gradient-to-r from-cyan-400 via-cyan-500 to-teal-400" />

          <div className="p-6">
            <div className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
              Live Preview
            </div>

            <h3 className="mt-5 text-2xl font-bold text-white">
              {formData.title || "Your Event Title"}
            </h3>

            <p className="mt-4 text-slate-400">
              {formData.description ||
                "Your event description will appear here as users will see it."}
            </p>

            <div className="mt-6 space-y-4 border-t border-cyan-500/10 pt-6">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Date
                </p>
                <p className="text-white">{formData.date || "Not selected"}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Time
                </p>
                <p className="text-white">{formData.time || "Not selected"}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Location
                </p>
                <p className="text-white">
                  {formData.location || "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Capacity
                </p>
                <p className="text-white">{formData.capacity || "Unlimited"}</p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
              Registration Open
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

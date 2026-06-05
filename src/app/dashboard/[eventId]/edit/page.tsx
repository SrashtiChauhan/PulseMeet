"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import { format } from "date-fns";

export default function EditEventPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    cutoffDate: "",
  });

  useEffect(() => {
    fetchEventData();
  }, [eventId]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  const fetchEventData = async () => {
    try {
      const res = await fetch(`/api/events/${eventId}`);
      if (res.ok) {
        const data = await res.json();
        const event = data.event;
        setFormData({
          title: event.title || "",
          description: event.description || "",
          date: event.date || "",
          time: event.time || "",
          location: event.location || "",
          capacity: event.capacity ? String(event.capacity) : "",
          cutoffDate: event.cutoffDate
            ? format(new Date(event.cutoffDate), "yyyy-MM-dd'T'HH:mm")
            : "",
        });
      } else {
        toast.error("Failed to load event data");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setInitialLoading(false);
    }
  };

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

      const res = await fetch(`/api/events/${eventId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to update event");
      }

      toast.success("Event updated successfully!");
      router.push(`/dashboard/${eventId}`);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href={`/dashboard/${eventId}`}
          className="
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
          Back to Event
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-cyan-500/15
        bg-[#08111f]
        shadow-[0_10px_40px_rgba(0,0,0,0.25)]
      "
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.04] via-transparent to-teal-500/[0.04]" />

        <div className="h-[3px] bg-gradient-to-r from-cyan-400 via-cyan-500 to-teal-400" />

        <div className="relative p-8 md:p-10">
          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
              Event Editor
            </div>

            <h1 className="mt-4 text-5xl font-bold text-white">
              Edit
              <span className="text-cyan-400"> Event</span>
            </h1>

            <p className="mt-3 text-slate-400 text-lg">
              Update event details and registration settings.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Event Title */}
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Event Title <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. AI Innovation Hackathon 2026"
                className="
                mt-2
                w-full
                rounded-2xl
                border
                border-cyan-500/10
                bg-slate-900/50
                px-4
                py-3
                text-white
                placeholder:text-slate-500
                outline-none
                transition-all
                duration-300
                focus:border-cyan-400/40
                focus:ring-2
                focus:ring-cyan-500/10
              "
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Description <span className="text-red-500">*</span>
              </label>

              <textarea
                name="description"
                required
                rows={5}
                value={formData.description}
                onChange={handleChange}
                className="
                mt-2
                w-full
                rounded-2xl
                border
                border-cyan-500/10
                bg-slate-900/50
                px-4
                py-3
                text-white
                placeholder:text-slate-500
                outline-none
                transition-all
                duration-300
                focus:border-cyan-400/40
                focus:ring-2
                focus:ring-cyan-500/10
              "
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Date <span className="text-red-500">*</span>
                </label>

                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="
                  mt-2
                  w-full
                  rounded-2xl
                  border
                  border-cyan-500/10
                  bg-slate-900/50
                  px-4
                  py-3
                  text-white
                  outline-none
                  transition-all
                  focus:border-cyan-400/40
                  focus:ring-2
                  focus:ring-cyan-500/10
                "
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Time <span className="text-red-500">*</span>
                </label>

                <input
                  type="time"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="
                  mt-2
                  w-full
                  rounded-2xl
                  border
                  border-cyan-500/10
                  bg-slate-900/50
                  px-4
                  py-3
                  text-white
                  outline-none
                  transition-all
                  focus:border-cyan-400/40
                  focus:ring-2
                  focus:ring-cyan-500/10
                "
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Location <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="Google Meet, Zoom, Auditorium..."
                className="
                mt-2
                w-full
                rounded-2xl
                border
                border-cyan-500/10
                bg-slate-900/50
                px-4
                py-3
                text-white
                placeholder:text-slate-500
                outline-none
                transition-all
                focus:border-cyan-400/40
                focus:ring-2
                focus:ring-cyan-500/10
              "
              />
            </div>

            {/* Bonus Settings */}
            <div className="border-t border-cyan-500/10 pt-8">
              <h3 className="mb-5 text-2xl font-semibold text-white">
                Bonus Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300">
                    Capacity (Optional)
                  </label>

                  <input
                    type="number"
                    name="capacity"
                    min="1"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="Unlimited if empty"
                    className="
                    mt-2
                    w-full
                    rounded-2xl
                    border
                    border-cyan-500/10
                    bg-slate-900/50
                    px-4
                    py-3
                    text-white
                    placeholder:text-slate-500
                    outline-none
                    transition-all
                    focus:border-cyan-400/40
                    focus:ring-2
                    focus:ring-cyan-500/10
                  "
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300">
                    Registration Cutoff (Optional)
                  </label>

                  <input
                    type="datetime-local"
                    name="cutoffDate"
                    value={formData.cutoffDate}
                    onChange={handleChange}
                    className="
                    mt-2
                    w-full
                    rounded-2xl
                    border
                    border-cyan-500/10
                    bg-slate-900/50
                    px-4
                    py-3
                    text-white
                    outline-none
                    transition-all
                    focus:border-cyan-400/40
                    focus:ring-2
                    focus:ring-cyan-500/10
                  "
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end pt-8">
              <button
                type="button"
                onClick={() => router.back()}
                className="
                mr-4
                rounded-2xl
                border
                border-cyan-500/15
                bg-cyan-500/5
                px-6
                py-3
                font-medium
                text-slate-300
                transition-all
                hover:bg-cyan-500/10
              "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-teal-500
                px-7
                py-3
                font-semibold
                text-slate-950
                shadow-lg
                shadow-cyan-500/20
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-cyan-500/40
                disabled:opacity-50
              "
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

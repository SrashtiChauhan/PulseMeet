"use client";

import { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Info,
  Share2,
  ArrowLeft,
} from "lucide-react";

import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function EventPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = use(params);
  const { data: session, status } = useSession();
  const router = useRouter();

  const [event, setEvent] = useState<any>(null);
  const [attendeeCount, setAttendeeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      const res = await fetch(`/api/events/${eventId}`);
      if (res.ok) {
        const data = await res.json();

        setEvent(data.event);
        setAttendeeCount(data.attendeeCount);
      } else {
        toast.error("Failed to load event details");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Event link copied to clipboard!");
  };

  const handleRegister = async () => {
    if (status === "unauthenticated") {
      toast("Please login to register", { icon: "ℹ️" });
      router.push("/login");
      return;
    }

    if (session?.user.role !== "ATTENDEE") {
      toast.error("Only attendees can register for events");
      return;
    }

    setRegistering(true);
    try {
      const res = await fetch(`/api/events/${eventId}/register`, {
        method: "POST",
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        fetchEventDetails();
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Event Not Found
        </h2>
      </div>
    );
  }

  const isFull = event.capacity && attendeeCount >= event.capacity;
  const isPastDeadline =
    event.cutoffDate && new Date() > new Date(event.cutoffDate);
  const eventDateTime = new Date(`${event.date}T${event.time}`);
  const isPastEventTime = new Date() > eventDateTime;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/dashboard"
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
          Back to Dashboard
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
        overflow-hidden
        rounded-[32px]
        border
        border-cyan-500/15
        bg-[#08111f]
      "
      >
        <div className="h-[3px] bg-gradient-to-r from-cyan-400 via-cyan-500 to-teal-400" />

        {/* Hero */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.04] via-transparent to-teal-500/[0.04]" />

          <div className="relative p-8 md:p-10">
            <div className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
              Featured Event
            </div>

            <h1 className="mt-5 text-4xl md:text-5xl font-bold text-white leading-tight">
              {event.title}
            </h1>

            <p className="mt-3 text-slate-400">
              Hosted by {event.hostId?.name || "Host"}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="grid gap-8 p-8 lg:grid-cols-[1.4fr_0.8fr]">
          {/* LEFT */}
          <div>
            <h2 className="mb-5 text-3xl font-bold text-white">
              About This Event
            </h2>

            <p className="whitespace-pre-wrap leading-8 text-slate-400">
              {event.description}
            </p>
          </div>

          {/* RIGHT CARD */}
          <div className="space-y-5">
            <div
              className="
              rounded-3xl
              border
              border-cyan-500/15
              bg-[#0B1526]
              p-6
            "
            >
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 mt-1 text-cyan-400" />

                  <div>
                    <p className="font-medium text-white">Date</p>

                    <p className="text-slate-400">
                      {format(new Date(event.date), "EEEE, MMMM d, yyyy")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 mt-1 text-cyan-400" />

                  <div>
                    <p className="font-medium text-white">Time</p>

                    <p className="text-slate-400">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-1 text-cyan-400" />

                  <div>
                    <p className="font-medium text-white">Location</p>

                    <p className="text-slate-400 break-all">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 mt-1 text-cyan-400" />

                  <div>
                    <p className="font-medium text-white">Attendees</p>

                    <p className="text-slate-400">
                      {attendeeCount}
                      {event.capacity ? ` / ${event.capacity}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status / Register */}
            <div className="space-y-4">
              {event.isClosed ? (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
                  Registrations are closed.
                </div>
              ) : isFull ? (
                <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 p-4 text-orange-400">
                  Event capacity reached.
                </div>
              ) : isPastDeadline ? (
                <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 p-4 text-orange-400">
                  Registration deadline passed.
                </div>
              ) : isPastEventTime ? (
                <div className="rounded-2xl border border-slate-500/20 bg-slate-500/10 p-4 text-slate-400">
                  Event already started.
                </div>
              ) : (
                <button
                  onClick={handleRegister}
                  disabled={registering}
                  className="
        w-full
        rounded-2xl
        bg-gradient-to-r
        from-cyan-500
        to-teal-500
        px-6
        py-4
        font-semibold
        text-slate-950
        shadow-lg
        shadow-cyan-500/20
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-cyan-500/40
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
                >
                  {registering ? "Registering..." : "Register Now"}
                </button>
              )}

              <button
                onClick={handleShare}
                className="
      w-full
      flex
      items-center
      justify-center
      rounded-2xl
      border
      border-cyan-500/15
      bg-cyan-500/5
      py-4
      text-cyan-300
      transition-all
      hover:bg-cyan-500/10
    "
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share Event
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

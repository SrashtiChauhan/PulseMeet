"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import {
  Calendar,
  MapPin,
  Eye,
  ArrowLeft,
  Ticket,
  Clock3,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function MyEventsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      status === "unauthenticated" ||
      (session && session.user.role !== "ATTENDEE")
    ) {
      router.push("/");
    } else if (status === "authenticated") {
      fetchMyEvents();
    }
  }, [status, session, router]);

  const fetchMyEvents = async () => {
    try {
      const res = await fetch("/api/attendee/events");
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      } else {
        toast.error("Failed to fetch your events");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">

    {/* Back Button */}
    <Link
      href="/"
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
      Back to Events
    </Link>

    {/* HERO */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        relative
        overflow-hidden
        mb-10
        rounded-[32px]
        border
        border-cyan-500/15
        bg-[#08111f]
      "
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.04] via-transparent to-teal-500/[0.04]" />

      <div className="h-[3px] bg-gradient-to-r from-cyan-400 via-cyan-500 to-teal-400" />

      <div className="relative p-8">

        <div className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
          Attendee Dashboard
        </div>

        <h1 className="mt-5 text-5xl font-bold text-white">
          My Registered
          <span className="text-cyan-400"> Events</span>
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-slate-400">
          Manage all events you've joined and quickly access
          event details, schedules and locations.
        </p>

      </div>
    </motion.div>

    {/* STATS */}
    {events.length > 0 && (
      <div className="mb-10 grid gap-5 md:grid-cols-3">

        <motion.div
          whileHover={{ y: -5 }}
          className="
            rounded-3xl
            border
            border-cyan-500/15
            bg-[#0B1526]
            p-6
          "
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">
              Registered Events
            </p>

            <Ticket className="h-5 w-5 text-cyan-400" />
          </div>

          <h3 className="mt-4 text-4xl font-bold text-white">
            {events.length}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Total registrations
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="
            rounded-3xl
            border
            border-violet-500/15
            bg-[#0B1526]
            p-6
          "
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">
              Upcoming
            </p>

            <Clock3 className="h-5 w-5 text-violet-400" />
          </div>

          <h3 className="mt-4 text-4xl font-bold text-white">
            {
              events.filter(
                (e) => new Date(e.date) > new Date()
              ).length
            }
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Future events
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="
            rounded-3xl
            border
            border-emerald-500/15
            bg-[#0B1526]
            p-6
          "
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">
              This Month
            </p>

            <Sparkles className="h-5 w-5 text-emerald-400" />
          </div>

          <h3 className="mt-4 text-4xl font-bold text-white">
            {
              events.filter(
                (e) =>
                  new Date(e.date).getMonth() ===
                  new Date().getMonth()
              ).length
            }
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Current month
          </p>
        </motion.div>

      </div>
    )}

    {/* EMPTY STATE */}
    {events.length === 0 ? (
      <div
        className="
          rounded-[32px]
          border
          border-cyan-500/15
          bg-[#08111f]
          p-16
          text-center
        "
      >
        <Calendar className="mx-auto h-14 w-14 text-cyan-400" />

        <h3 className="mt-5 text-2xl font-bold text-white">
          No Registered Events
        </h3>

        <p className="mt-3 text-slate-400">
          You haven't joined any events yet.
        </p>

        <Link
          href="/"
          className="
            mt-6
            inline-flex
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500
            to-teal-500
            px-6
            py-3
            font-semibold
            text-slate-950
          "
        >
          Browse Events
        </Link>
      </div>
    ) : (
      <div
        className="
          grid
          gap-8
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {events.map((event, index) => (
          <motion.div
            key={event._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
            }}
            whileHover={{
              y: -8,
            }}
            className="
              overflow-hidden
              rounded-[32px]
              border
              border-cyan-500/15
              bg-[#08111f]
            "
          >
            <div className="h-[3px] bg-gradient-to-r from-cyan-400 via-cyan-500 to-teal-400" />

            <div className="p-6">

              <div className="mb-5 flex items-center gap-3">

                <span
                  className="
                    rounded-full
                    border
                    border-emerald-500/20
                    bg-emerald-500/10
                    px-3
                    py-1
                    text-xs
                    text-emerald-400
                  "
                >
                  Registered
                </span>

                <span
                  className="
                    rounded-full
                    bg-cyan-500/10
                    px-3
                    py-1
                    text-xs
                    text-cyan-300
                  "
                >
                  {format(
                    new Date(event.date),
                    "MMM d"
                  )}
                </span>

              </div>

              <h3 className="min-h-[70px] text-2xl font-bold text-white">
                {event.title}
              </h3>

              <div className="mt-6 space-y-4 text-slate-400">

                <div className="flex items-center">
                  <Calendar className="mr-3 h-4 w-4 text-cyan-400" />

                  {format(
                    new Date(event.date),
                    "MMM d, yyyy"
                  )}
                  {" • "}
                  {event.time}
                </div>

                <div className="flex items-center">
                  <MapPin className="mr-3 h-4 w-4 text-cyan-400" />

                  <span className="truncate">
                    {event.location}
                  </span>
                </div>

              </div>

            </div>

            <div className="border-t border-cyan-500/10 p-6">

              <Link
                href={`/events/${event._id}`}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-2xl
                  bg-cyan-500/10
                  px-5
                  py-3
                  font-medium
                  text-cyan-300
                  transition-all
                  hover:bg-cyan-500/20
                "
              >
                <Eye className="mr-2 h-4 w-4" />
                View Event Details
              </Link>

            </div>

          </motion.div>
        ))}
      </div>
    )}

  </div>
);
}

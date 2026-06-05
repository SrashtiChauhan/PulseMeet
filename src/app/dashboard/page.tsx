"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import {
  Plus,
  Calendar,
  MapPin,
  ArrowLeft,
  CalendarDays,
  Users,
  Activity,
  CheckCircle2,
  Ticket,
  Radio,
} from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      status === "unauthenticated" ||
      (session && session.user.role !== "HOST")
    ) {
      router.push("/");
    } else if (status === "authenticated") {
      fetchEvents();
    }
  }, [status, session, router]);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");

      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      } else {
        toast.error("Failed to fetch events");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const upcomingEvents = events.filter(
    (event) => !event.isClosed && new Date(event.date) >= new Date(),
  );

  const openEvents = events.filter(
    (event) => !event.isClosed && new Date(event.date) >= new Date(),
  );

  const closedEvents = events.filter(
    (event) => event.isClosed || new Date(event.date) < new Date(),
  );

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-300 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="
    relative
    overflow-hidden
    mb-10
    rounded-[32px]
    border
    border-cyan-500/15
    bg-[#08111f]
    p-8
    md:p-10
  "
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.04] via-transparent to-teal-500/[0.04]" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
              Host Workspace
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Welcome back,
              <span className="text-cyan-400"> {session?.user?.name}</span>
            </h1>

            <p className="mt-4 max-w-2xl text-slate-400 text-lg">
              Manage events, registrations and attendees from one unified
              workspace.
            </p>

            <div className="mt-6 flex flex-wrap gap-6 text-sm">
              <div>
                <span className="text-cyan-400 font-bold">{events.length}</span>
                <span className="ml-2 text-slate-400">Total Events</span>
              </div>

              <div>
                <span className="text-emerald-400 font-bold">
                  {upcomingEvents.length}
                </span>
                <span className="ml-2 text-slate-400">Upcoming</span>
              </div>
            </div>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -5, 0],
            }}
            transition={{
              opacity: {
                delay: 0.5,
                duration: 0.4,
              },
              x: {
                delay: 0.5,
                duration: 0.4,
              },
              y: {
                delay: 1.5,
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <Link
              href="/dashboard/create-event"
              className="
      inline-flex
      items-center
      justify-center
      rounded-2xl
      bg-gradient-to-r
      from-cyan-500
      to-teal-500
      px-8
      py-4
      font-semibold
      text-slate-950
      shadow-lg
      shadow-cyan-500/20
      transition-all
      hover:scale-105
    "
            >
              + Create Event
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Events */}
        <motion.div
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 18,
          }}
          className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-cyan-500/15
      bg-[#08111f]
      p-6
    "
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.04] to-transparent" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Events</p>

              <CalendarDays className="h-5 w-5 text-cyan-400" />
            </div>

            <h3 className="mt-4 text-4xl font-bold text-white">
              {events.length}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Events created on PulseMeet
            </p>
          </div>
        </motion.div>

        {/* Upcoming */}
        <motion.div
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 18,
          }}
          className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-cyan-500/15
      bg-[#08111f]
      p-6
    "
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.04] to-transparent" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Upcoming</p>

              <Calendar className="h-5 w-5 text-emerald-400" />
            </div>

            <h3 className="mt-4 text-4xl font-bold text-white">
              {upcomingEvents.length}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Scheduled future events
            </p>
          </div>
        </motion.div>

        {/* Open */}
        <motion.div
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 18,
          }}
          className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-cyan-500/15
      bg-[#08111f]
      p-6
    "
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.04] to-transparent" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Open</p>

              <CheckCircle2 className="h-5 w-5 text-cyan-400" />
            </div>

            <h3 className="mt-4 text-4xl font-bold text-white">
              {openEvents.length}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Currently accepting registrations
            </p>
          </div>
        </motion.div>

        {/* Closed */}
        <motion.div
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 18,
          }}
          className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-cyan-500/15
      bg-[#08111f]
      p-6
    "
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.04] to-transparent" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Closed</p>

              <Activity className="h-5 w-5 text-amber-400" />
            </div>

            <h3 className="mt-4 text-4xl font-bold text-white">
              {closedEvents.length}
            </h3>

            <p className="mt-2 text-sm text-slate-500">Closed registrations</p>
          </div>
        </motion.div>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
            No events
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get started by creating a new event.
          </p>
          <div className="mt-6">
            <Link
              href="/dashboard/create-event"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors"
            >
              <Plus className="w-5 h-5 mr-1" />
              New Event
            </Link>
          </div>
        </div>
      ) : (
        <>
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
            }}
            className="mb-8 flex items-center justify-between"
          >
            <div>
              <h2 className="text-3xl font-bold text-white">Your Events</h2>

              <p className="mt-2 text-slate-400">
                Manage registrations, monitor activity and update event details.
              </p>
            </div>

            <div className="rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-2 text-sm text-cyan-300">
              {events.length} Event{events.length !== 1 ? "s" : ""}
            </div>
          </motion.div>

          <motion.div
            initial={{
              scaleX: 0,
            }}
            whileInView={{
              scaleX: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
            }}
            style={{
              transformOrigin: "left",
            }}
            className="h-px w-full bg-gradient-to-r from-cyan-500/20 via-cyan-500/5 to-transparent mb-8"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
              const isRegistrationOpen =
                !event.isClosed && new Date(event.date) >= new Date();

              return (
                <motion.div
                  key={event._id}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                  }}
                  className="
          group
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-cyan-500/15
          bg-[#08111f]
          transition-all
          duration-300
          hover:border-cyan-400/30
          hover:shadow-[0_0_40px_rgba(6,182,212,0.12)]
        "
                >
                  <div className="h-[2px] bg-gradient-to-r from-cyan-400 via-cyan-500 to-teal-400" />

                  <div className="relative p-7">
                    <h3 className="text-2xl font-bold text-white line-clamp-2">
                      {event.title}
                    </h3>

                    <div className="mt-4 flex items-start justify-between">
                      {isRegistrationOpen ? (
                        <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                          Registration Open
                        </div>
                      ) : (
                        <div className="inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400">
                          Registration Closed
                        </div>
                      )}
                    </div>

                    <div className="mt-6 space-y-4 text-sm">
                      <div className="flex items-center text-zinc-400">
                        <Calendar className="mr-3 h-4 w-4 text-cyan-400" />
                        {format(new Date(event.date), "MMM d, yyyy")} at{" "}
                        {event.time}
                      </div>

                      <div className="flex items-center text-zinc-400">
                        <MapPin className="mr-3 h-4 w-4 text-cyan-400" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 px-6 py-4 flex items-center justify-between">
                    <Link
                      href={`/events/${event._id}`}
                      className="text-sm font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
                    >
                      View Public Page
                    </Link>

                    <Link
                      href={`/dashboard/${event._id}`}
                      className="flex items-center text-sm font-semibold text-zinc-400 transition-colors hover:text-white"
                    >
                      <Users className="mr-1 h-4 w-4" />
                      Manage
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

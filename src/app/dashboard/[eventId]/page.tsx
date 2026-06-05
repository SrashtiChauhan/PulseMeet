"use client";

import { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import {
  ArrowLeft,
  Download,
  Users,
  UserCheck,
  Gauge,
  Calendar,
  MapPin,
  Search,
  Edit,
  Trash2,
  Share2,
  Activity,
} from "lucide-react";

import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { div } from "framer-motion/m";

export default function EventDashboardPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = use(params);
  const { data: session, status } = useSession();
  const router = useRouter();

  const [event, setEvent] = useState<any>(null);
  const [attendees, setAttendees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (
      status === "unauthenticated" ||
      (session && session.user.role !== "HOST")
    ) {
      router.push("/");
    } else if (status === "authenticated") {
      fetchEventData();
    }
  }, [status, session, router, eventId]);

  const fetchEventData = async () => {
    try {
      const res = await fetch(`/api/events/${eventId}/attendees`);
      if (res.ok) {
        const data = await res.json();
        setEvent(data.event);
        setAttendees(data.attendees);
      } else {
        toast.error("Failed to load event data");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    window.open(`/api/events/${eventId}/export`, "_blank");
  };

  const handleShare = () => {
    const url = `${window.location.origin}/events/${eventId}`;
    navigator.clipboard.writeText(url);
    toast.success("Event link copied to clipboard!");
  };

  const handleDeleteEvent = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this event? This action cannot be undone and all registrations will be removed.",
      )
    ) {
      return;
    }
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Event deleted successfully");
        router.push("/dashboard");
        router.refresh();
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed to delete event");
        setIsDeleting(false);
      }
    } catch (error) {
      toast.error("An error occurred");
      setIsDeleting(false);
    }
  };

  const filteredAttendees = attendees.filter(
    (a) =>
      a.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!event) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
      {/* Back Button */}
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

      {/* HERO */}
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="
    relative
    overflow-hidden
    mb-8
    rounded-[32px]
    border
    border-cyan-500/15
    bg-[#08111f]
  "
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.04] via-transparent to-teal-500/[0.04]" />

        <div className="h-[3px] bg-gradient-to-r from-cyan-400 via-cyan-500 to-teal-400" />

        <div className="relative p-6 lg:p-7">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            {/* Event Info */}
            <div className="flex-1">
              <div className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                Event Dashboard
              </div>

              <h1 className="mt-5 text-5xl font-bold text-white leading-tight">
                {event.title}
              </h1>

              <div className="mt-5 flex flex-wrap gap-6 text-slate-400">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-cyan-400" />
                  {format(new Date(event.date), "MMM d, yyyy")}
                </div>

                <div className="flex items-center">
                  <span className="mr-2 text-cyan-400">•</span>
                  {event.time}
                </div>

                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-cyan-400" />
                  {event.location}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-start justify-end gap-3 max-w-[620px]">
              <Link
                href={`/dashboard/${eventId}/edit`}
                className="
      h-14
      flex items-center justify-center
      rounded-2xl
      border border-cyan-500/15
      bg-cyan-500/5
      px-5
      text-white
      hover:bg-cyan-500/10
      transition-all
    "
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>

              <button
                onClick={handleDeleteEvent}
                disabled={isDeleting}
                className="
      h-14
      flex items-center justify-center
      rounded-2xl
      border border-red-500/20
      bg-red-500/10
      px-5
      text-red-400
      hover:bg-red-500/20
      transition-all
    "
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {isDeleting ? "Deleting..." : "Delete"}
              </button>

              <button
                onClick={handleExportCSV}
                className="
      h-14
      flex items-center justify-center
      rounded-2xl
      bg-gradient-to-r
      from-cyan-500
      to-teal-500
      px-5
      font-semibold
      text-slate-950
      shadow-lg
      shadow-cyan-500/20
    "
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </button>

              <button
                onClick={handleShare}
                className="
      h-14
      flex items-center justify-center
      rounded-2xl
      border border-cyan-500/15
      bg-cyan-500/5
      px-5
      text-cyan-300
      hover:bg-cyan-500/10
      transition-all
    "
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </button>

              <Link
                href={`/events/${eventId}`}
                className="
      h-14
      flex items-center justify-center
      rounded-2xl
      border border-cyan-500/15
      bg-[#0B1526]
      px-5
      text-slate-300
      hover:border-cyan-500/30
      transition-all
    "
              >
                View Public Page
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="p-8">
        {/* STATS */}
        <div className="grid gap-5 md:grid-cols-4 mb-10">
          <motion.div
            whileHover={{ y: -6 }}
            className="
        rounded-3xl
        border
        border-cyan-500/15
        bg-[#0B1526]
        p-6
      "
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Registered</p>

              <UserCheck className="h-5 w-5 text-cyan-400" />
            </div>

            <h3 className="mt-4 text-4xl font-bold text-white">
              {attendees.length}
            </h3>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="
        rounded-3xl
        border
        border-violet-500/15
        bg-[#0B1526]
        p-6
      "
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Capacity</p>

              <Gauge className="h-5 w-5 text-violet-400" />
            </div>

            <h3 className="mt-4 text-4xl font-bold text-white">
              {event.capacity || "∞"}
            </h3>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="
        rounded-3xl
        border
        border-emerald-500/15
        bg-[#0B1526]
        p-6
      "
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Remaining</p>

              <Users className="h-5 w-5 text-emerald-400" />
            </div>

            <h3 className="mt-4 text-4xl font-bold text-white">
              {event.capacity ? event.capacity - attendees.length : "∞"}
            </h3>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="
        rounded-3xl
        border
        border-cyan-500/15
        bg-[#0B1526]
        p-6
      "
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Status</p>

              <Activity className="h-5 w-5 text-cyan-400" />
            </div>

            <h3 className="mt-4 text-xl font-semibold text-emerald-400">
              Registration Open
            </h3>
          </motion.div>
        </div>

        {/* ATTENDEES HEADER */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">Attendees</h2>

            <p className="mt-2 text-slate-400">
              View and manage all registered participants.
            </p>
          </div>

          <div className="relative w-full lg:w-80">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

            <input
              type="text"
              placeholder="Search attendees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
          w-full
          rounded-2xl
          border
          border-cyan-500/15
          bg-[#0B1526]
          py-3
          pl-12
          pr-4
          text-white
          placeholder:text-slate-500
          outline-none
          focus:border-cyan-400/30
        "
            />
          </div>
        </div>

        {/* TABLE */}
        <div
          className="
      overflow-hidden
      rounded-[28px]
      border
      border-cyan-500/15
      bg-[#08111f]
    "
        >
          <table className="min-w-full">
            <thead className="bg-[#0B1526]">
              <tr>
                <th className="px-6 py-5 text-left text-xs uppercase tracking-widest text-slate-500">
                  Name
                </th>

                <th className="px-6 py-5 text-left text-xs uppercase tracking-widest text-slate-500">
                  Email
                </th>

                <th className="px-6 py-5 text-left text-xs uppercase tracking-widest text-slate-500">
                  Registered
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-cyan-500/10">
              {filteredAttendees.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="
                py-16
                text-center
                text-slate-500
              "
                  >
                    No attendees found.
                  </td>
                </tr>
              ) : (
                filteredAttendees.map((attendee) => (
                  <tr
                    key={attendee._id}
                    className="
                transition-all
                hover:bg-cyan-500/[0.03]
              "
                  >
                    <td className="px-6 py-5">
                      <p className="font-medium text-white">
                        {attendee.user?.name}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-slate-400">
                      {attendee.user?.email}
                    </td>

                    <td className="px-6 py-5 text-slate-400">
                      {format(
                        new Date(attendee.registeredAt),
                        "MMM d, yyyy h:mm a",
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

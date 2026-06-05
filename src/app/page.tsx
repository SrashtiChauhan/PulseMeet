"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import toast from "react-hot-toast";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Home() {
  const [events, setEvents] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  const mouseX = useMotionValue(0);

  const mouseY = useMotionValue(0);

  const particles = [
    { x: 120, y: 650, delay: 0, duration: 20 },

    { x: 260, y: 720, delay: 2, duration: 22 },

    { x: 420, y: 800, delay: 4, duration: 24 },

    { x: 580, y: 680, delay: 1, duration: 21 },

    { x: 740, y: 760, delay: 3, duration: 25 },

    { x: 900, y: 700, delay: 5, duration: 23 },

    { x: 1050, y: 850, delay: 2, duration: 26 },

    { x: 180, y: 900, delay: 6, duration: 22 },

    { x: 640, y: 950, delay: 7, duration: 24 },

    { x: 980, y: 880, delay: 3, duration: 21 },
  ];

  const smoothX = useSpring(mouseX, {
    stiffness: 50,

    damping: 20,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 50,

    damping: 20,
  });

  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events/all");

      if (res.ok) {
        const data = await res.json();
        console.log("API RESPONSE:", data);

        setEvents(data);
      } else {
        toast.error("Failed to load events");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12"
      onMouseMove={(e) => {
        mouseX.set(e.clientX);

        mouseY.set(e.clientY);
      }}
    >
      <motion.div
        className="pointer-events-none fixed z-[1] h-[500px] w-[500px] rounded-full"
        style={{
          left: smoothX,

          top: smoothY,

          transform: "translate(-50%, -50%)",

          background:
            "radial-gradient(circle, rgba(6,182,212,0.16), transparent 70%)",

          filter: "blur(90px)",
        }}
      />

      <div className="grid min-h-[75vh] items-center gap-24 lg:grid-cols-[1.1fr_0.9fr]">
        {/* LEFT SIDE */}

        <div className="max-w-xl">
          <motion.div
            className="mb-6 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            🚀 Trusted by Student Clubs & Communities
          </motion.div>

          <motion.h1
            className="text-6xl font-bold leading-[0.95] tracking-[-0.04em] text-white md:text-8xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Bring Your
            <br />
            <motion.span
              className="
    bg-gradient-to-r
    from-cyan-300
    to-cyan-500
    bg-clip-text
    text-transparent
  "
              animate={{
                textShadow: [
                  "0 0 0px rgba(6,182,212,0)",
                  "0 0 30px rgba(6,182,212,0.8)",
                  "0 0 0px rgba(6,182,212,0)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              Community
            </motion.span>
            <br />
            Together.
          </motion.h1>

          <motion.p
            className="mt-8 max-w-lg text-xl leading-relaxed text-slate-400"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
            }}
          >
            Create memorable experiences for hackathons, college fests,
            workshops, tech talks and community gatherings.
          </motion.p>

          <motion.div
            className="mt-14 flex gap-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.8,
              duration: 0.8,
            }}
          >
            <button
              onClick={() => {
                if (!session) {
                  router.push("/login");
                } else if (session.user?.role === "HOST") {
                  router.push("/dashboard/create-event");
                } else {
                  document.getElementById("events")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }
              }}
              className="rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 px-7 py-4 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
            >
              {!session
                ? "Get Started"
                : session.user?.role === "HOST"
                  ? "Create Event"
                  : "Explore Events"}
            </button>

            <button
              onClick={() => {
                if (!session) {
                  router.push("/login");
                } else if (session.user?.role === "HOST") {
                  router.push("/dashboard");
                } else {
                  router.push("/attendee/my-events");
                }
              }}
              className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur-xl hover:bg-white/10"
            >
              {!session
                ? "Learn More"
                : session.user?.role === "HOST"
                  ? "Dashboard"
                  : "My Communities"}
            </button>
          </motion.div>

          <motion.div
            className="mt-12 flex justify-center gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 1,
              duration: 0.8,
            }}
          ></motion.div>
        </div>

        {/* RIGHT SIDE */}

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block lg:pl-12 -mt-10"
        >
          <div className="space-y-6">
            <div className="rounded-3xl border border-cyan-500/10 bg-white/[0.03] p-8 backdrop-blur-xl min-h-[430px]">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-cyan-400">
                  PulseMeet Preview
                </span>

                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                  Open
                </span>
              </div>

              <h3 className="mt-5 text-3xl font-bold text-white">
                AI Hackathon 2026
              </h3>

              <p className="mt-3 text-slate-400">
                Build innovative AI solutions with students and developers from
                across India.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-slate-400">Date</span>
                  <span className="text-white">12 June 2026</span>
                </div>

                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-slate-400">Location</span>
                  <span className="text-white">New Delhi</span>
                </div>

                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-slate-400">Registered</span>
                  <span className="text-cyan-400">124 People</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Seats Left</span>
                  <span className="text-emerald-400">18</span>
                </div>
              </div>

              <button className="mt-6 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 py-3 font-semibold text-slate-950">
                Explore Platform
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent pointer-events-none" />
        <motion.div
          id="events"
          className="relative mt-40 pt-20 w-full"
          initial={{
            opacity: 0,
            y: 120,
            scale: 0.95,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
        >
          <div className="absolute inset-0 -z-10 bg-transparent" />
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
              Live Events
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              className="mt-4 flex justify-center"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(6,182,212,0)",
                    "0 0 25px rgba(6,182,212,0.35)",
                    "0 0 0px rgba(6,182,212,0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 backdrop-blur-xl"
              >
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />

                <span className="font-semibold text-cyan-300">
                  {events.length}
                </span>

                <span className="ml-2 text-sm text-slate-300">
                  Live Community Experiences
                </span>
              </motion.div>
            </motion.div>

            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              Upcoming Community Events
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-zinc-400">
              Find hackathons, workshops, student clubs and community events
              happening around you.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center min-h-[40vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
          ) : events.length === 0 ? (
            <motion.div
              className="text-center py-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl max-w-2xl mx-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
              }}
            >
              <Calendar className="mx-auto h-16 w-16 text-zinc-500 mb-4" />

              <h3 className="text-xl font-semibold text-white">
                No Community Events Yet
              </h3>

              <p className="mt-2 text-zinc-400">
                Create the first event and start building your community today.
              </p>

              <div className="mt-6">
                <Link
                  href="/register"
                  className="inline-flex items-center rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-6 py-3 font-semibold text-white transition-all hover:scale-[1.02]"
                >
                  Create First Event
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="mt-16 w-full">
              {/* Mobile Layout */}
              <div className="flex flex-col gap-6 md:hidden">
                {events.map((event) => (
                  <motion.div
                    key={event._id}
                    whileHover={{
                      y: -8,
                      scale: 1.01,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="
      relative
      w-full
      overflow-hidden
      rounded-[28px]
      border
      border-cyan-500/15
      bg-[#071225]
      backdrop-blur-xl
      shadow-[0_0_40px_rgba(6,182,212,0.05)]
    "
                  >
                    {/* Glow Background */}

                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-emerald-500/[0.03]" />

                    {/* Top Accent Line */}

                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

                    <div className="relative flex min-h-[430px] flex-col p-8">
                      {/* Header */}

                      <div className="mb-6 flex items-center justify-between">
                        <span className="rounded-full bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-400">
                          Community Event
                        </span>

                        {event.isClosed ? (
                          <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-400">
                            Closed
                          </span>
                        ) : (
                          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                            Open
                          </span>
                        )}
                      </div>

                      {/* Title */}

                      <h3 className="mb-5 text-4xl font-bold leading-tight text-white">
                        {event.title}
                      </h3>

                      {/* Description */}

                      <p className="mb-8 line-clamp-3 text-lg leading-relaxed text-slate-400">
                        {event.description}
                      </p>

                      {/* Meta */}

                      <div className="space-y-5">
                        <div className="flex items-center text-slate-300">
                          <Calendar className="mr-3 h-5 w-5 text-cyan-400" />
                          {format(new Date(event.date), "MMM d, yyyy")}
                        </div>

                        <div className="flex items-center text-slate-300">
                          <MapPin className="mr-3 h-5 w-5 text-emerald-400" />
                          {event.location}
                        </div>
                      </div>

                      {/* Divider */}

                      <div className="my-8 border-t border-white/10" />

                      {/* Footer */}

                      <div className="mt-auto flex items-center justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-slate-500">
                            Hosted By
                          </p>

                          <p className="mt-1 font-semibold text-white">
                            {event.hostId?.name}
                          </p>
                        </div>

                        <Link
                          href={`/events/${event._id}`}
                          className="
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500
            to-emerald-500
            px-8
            py-3
            font-semibold
            text-slate-950
            shadow-lg
            shadow-cyan-500/20
            transition-all
            hover:scale-105
          "
                        >
                          View Event
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:flex gap-6 overflow-x-auto overflow-y-visible py-4 pb-8 scrollbar-hide">
                {events.map((event) => (
                  <motion.div
                    key={event._id}
                    whileHover={{
                      scale: 1.02,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="
    relative
    w-[380px]
    h-[420px]
    min-w-[380px]
    overflow-hidden
    rounded-3xl
    border
    border-cyan-500/15
    bg-[#071225]
    backdrop-blur-xl
    shadow-[0_0_30px_rgba(6,182,212,0.05)]
    hover:border-cyan-400/30
    hover:shadow-[0_0_50px_rgba(6,182,212,0.15)]
  "
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                    <div className="flex h-full flex-col p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
                          Community Event
                        </span>

                        {event.isClosed ? (
                          <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-400">
                            Closed
                          </span>
                        ) : (
                          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                            Open
                          </span>
                        )}
                      </div>

                      <h3 className="mb-4 min-h-[64px] text-2xl font-bold text-white line-clamp-2">
                        {event.title}
                      </h3>

                      <p className="mb-6 min-h-[78px] line-clamp-3 text-slate-400">
                        {event.description}
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-center text-slate-300">
                          <Calendar className="mr-3 h-4 w-4 text-cyan-400" />
                          {format(new Date(event.date), "MMM d, yyyy")}
                        </div>

                        <div className="flex items-center text-slate-300">
                          <MapPin className="mr-3 h-4 w-4 text-emerald-400" />
                          {event.location}
                        </div>
                      </div>

                      <div className="my-6 border-t border-white/10" />

                      <div className="mt-auto flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-500">Hosted By</p>
                          <p className="font-medium text-white">
                            {event.hostId?.name}
                          </p>
                        </div>

                        <Link
                          href={`/events/${event._id}`}
                          className="rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-3 font-semibold text-slate-950"
                        >
                          View Event
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

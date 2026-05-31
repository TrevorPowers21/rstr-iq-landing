import { useState, FormEvent, useEffect, useRef } from "react";
import {
  BarChart3,
  TrendingUp,
  Zap,
  FileText,
  ChevronRight,
  Mail,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  Activity,
  DollarSign,
  Database,
  Shield,
  ChevronLeft,
} from "lucide-react";



// ─── Config — update these before deploying ────────────────────────────────
const APP_URL = "https://rstriq.com";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
const CONTACT = {
  peyton: { name: "Peyton Beard", email: "peyton.beard@rstriq.com" },
  trevor: { name: "Trevor Powers", email: "trevor.powers@rstriq.com" },
};

// ─── Data ───────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Database,
    title: "Program-Specific Projections",
    description:
      "Every D1 player's projected stats precomputed for your program before you open the page. Your park, your conference, your numbers.",
  },
  {
    icon: TrendingUp,
    title: "Transfer Portal Simulator",
    description:
      "Project any D1 or JUCO player at any destination, with handedness-aware park factors, district-specific JUCO weights, and daily portal updates.",
  },
  {
    icon: DollarSign,
    title: "Market Valuations",
    description:
      "Automated market values tied to projected WAR, conference tier, position scarcity, and depth role. Know what a player is worth at your school specifically.",
  },
  {
    icon: BarChart3,
    title: "Team Builder",
    description:
      "Build your 2027 roster slot by slot and benchmark aggregate oWAR and pWAR against 2025 conference and national champions.",
  },
  {
    icon: Activity,
    title: "Live Portal Intelligence",
    description:
      "Portal entries flow in daily with status badges, contact info (phone, email, GPA, athletic aid), and a prioritized activity feed for players you're watching.",
  },
  {
    icon: FileText,
    title: "Detailed Scouting Reports",
    description:
      "Data-driven archetype classification for every eligible D1 player with full prose reports that translate the numbers into baseball language your staff can act on.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Your program gets onboarded",
    description:
      "Once your program is set up, every D1 and JUCO player is precomputed for your park, conference, and market.",
  },
  {
    step: "02",
    title: "Open and read. No filters to set.",
    description:
      "Every dashboard, profile, and exported PDF shows what each player would do at your school. Same number every time.",
  },
  {
    step: "03",
    title: "Build rosters. Track targets. Set the budget.",
    description:
      "Run Team Builder scenarios against championship benchmarks, follow portal targets in a click, and export scouting sheets with your numbers baked in.",
  },
];

const METRICS = [
  { label: "D1 + JUCO Players Tracked", value: "15,000+" },
  { label: "Scouting Metrics Per Player", value: "20+" },
  { label: "Data Refresh", value: "Daily" },
  { label: "Destinations Modeled", value: "Every D1" },
];

// ─── Screenshot Slides ────────────────────────────────────────────────────

const SLIDES = [
  {
    label: "Overview",
    sub: "Morning briefing, recent portal activity, and top hitters and pitchers ranked for your program",
    img: "/screen-overview.png",
    url: "rstriq.com/dashboard",
  },
  {
    label: "Player Dashboard",
    sub: "Every D1 and JUCO player projected and valued at your destination — sortable by any stat",
    img: "/screen-player-dashboard.png",
    url: "rstriq.com/dashboard/returning",
  },
  {
    label: "Transfer Portal",
    sub: "Simulate any player transfer to your program with handedness-aware park factors and JUCO support",
    img: "/screen-portal.png",
    url: "rstriq.com/dashboard/portal",
  },
  {
    label: "Team Builder",
    sub: "Build your 2027 roster, track roster budget, and benchmark your build against champions",
    img: "/screen-teambuilder.png",
    url: "rstriq.com/dashboard/team-builder",
  },
  {
    label: "Player Profile",
    sub: "Full projection, scouting grades, career stats, and risk assessment — precomputed for your school",
    img: "/screen-player.png",
    url: "rstriq.com/dashboard/player",
  },
];

function ScreenShot({ img, url }: { img: string; url: string }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gold/8 blur-3xl rounded-full scale-75 pointer-events-none" />
      <div className="relative rounded-xl overflow-hidden border border-gold/20 shadow-2xl shadow-black/70">
        {/* Browser chrome */}
        <div
          className="flex items-center gap-3 px-4 py-3 border-b border-white/5"
          style={{ background: "#0a0f1e" }}
        >
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 bg-white/5 rounded text-center text-xs text-slate-500 py-1 px-3 truncate">
            {url}
          </div>
          <div className="w-16" />
        </div>
        {/* Real screenshot */}
        <img
          src={img}
          alt={url}
          className="w-full block"
          style={{ display: "block", maxHeight: 520, objectFit: "cover", objectPosition: "top" }}
        />
      </div>
    </div>
  );
}



function ScreenshotCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = (dir: 1 | -1) => {
    setActive((prev) => (prev + dir + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => advance(1), 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, active]);

  const slide = SLIDES[active];

  return (
    <section className="py-28 section-divider theme-bg" id="platform">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl sm:text-6xl font-bold mb-4">
            See the platform in action.
          </h2>
          <p className="text-xl max-w-xl mx-auto" style={{ color: "var(--color-text-muted)" }}>
            Every screen your staff needs, built around the decisions that matter.
          </p>
        </div>

        {/* Tab nav */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {SLIDES.map((s, i) => (
            <button
              key={s.label}
              onClick={() => { setActive(i); setPaused(true); }}
              className={`font-heading text-sm font-medium px-5 py-2.5 rounded-full tracking-wide transition-all duration-200 ${
                i === active
                  ? "bg-navy text-white"
                  : "border border-gold/20 text-slate-500 hover:text-gold-dark hover:border-gold/40"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Screenshot */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="pointer-events-none absolute inset-0 bg-gold/6 blur-3xl rounded-full scale-75" />

          <div className="relative transition-opacity duration-300">
            <ScreenShot img={slide.img} url={slide.url} />
          </div>

          {/* Prev / Next arrows */}
          <button
            onClick={() => { advance(-1); setPaused(true); }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-10 h-10 rounded-full border border-navy/20 flex items-center justify-center text-navy hover:bg-navy/10 transition-colors duration-200"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => { advance(1); setPaused(true); }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-10 h-10 rounded-full border border-navy/20 flex items-center justify-center text-navy hover:bg-navy/10 transition-colors duration-200"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Caption + dots */}
        <div className="text-center mt-8">
          <p className="font-heading text-xl font-semibold mb-1 tracking-wide" style={{ color: "var(--color-text)" }}>
            {SLIDES[active].label}
          </p>
          <p className="text-base mb-6" style={{ color: "var(--color-text-muted)" }}>{SLIDES[active].sub}</p>
          <div className="flex justify-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActive(i); setPaused(true); }}
                className={`rounded-full transition-all duration-300 ${
                  i === active ? "w-8 h-2 bg-navy" : "w-2 h-2 bg-navy/20 hover:bg-navy/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


// ─── Components ─────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur border-b transition-colors duration-200"
      style={{ background: "var(--color-nav-bg)", borderColor: "var(--color-section-div)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <img src="/rstr-iq-logo.png" alt="RSTR IQ" className="h-8 w-auto" style={{ filter: "brightness(0) saturate(100%) invert(4%) sepia(98%) saturate(1167%) hue-rotate(207deg)" }} />
        <div className="flex items-center gap-3">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-gold-dark transition-colors duration-200 flex items-center gap-1"
            style={{ color: "var(--color-text-muted)" }}
          >
            Access the App <ExternalLink size={13} className="opacity-70" />
          </a>
          <a
            href="#contact"
            className="text-sm font-medium bg-navy text-white px-4 py-2 rounded hover:bg-navy-light transition-colors duration-200"
          >
            Request a Demo
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(160,136,32,0.06)" }} />

      <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 border px-4 py-2 rounded-full mb-8 tracking-wider uppercase text-sm font-medium" style={{ background: "rgba(160,136,32,0.1)", borderColor: "rgba(160,136,32,0.25)", color: "#A08820" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          Trusted by D1 Programs
        </div>

        <h1 className="font-heading text-5xl sm:text-6xl lg:text-8xl font-bold leading-tight mb-6" style={{ color: "var(--color-text)" }}>
          The Roster Intelligence
          <br />
          <span className="gold-gradient">Platform Built for</span>
          <br />
          College Baseball
        </h1>

        <p className="text-xl sm:text-2xl max-w-3xl mx-auto mb-14 leading-relaxed" style={{ color: "var(--color-text-sub)" }}>
          Data-driven projections, market valuations, and transfer portal
          intelligence for every D1 and JUCO player, precomputed for your
          program before you open the page. No simulator step. No manual imports.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-navy text-white font-heading font-semibold text-xl px-10 py-5 rounded hover:bg-navy-light transition-colors duration-200 tracking-wide"
          >
            Request a Demo <ArrowRight size={20} />
          </a>
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border-2 border-navy/20 text-navy font-heading font-semibold text-xl px-10 py-5 rounded hover:border-gold-dark hover:text-gold-dark transition-colors duration-200 tracking-wide"
          >
            Access the App <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="py-28 max-w-7xl mx-auto px-6 theme-bg">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-heading text-5xl sm:text-6xl font-bold mb-8">
          Roster decisions don't have time to wait on a spreadsheet.
        </h2>
        <p className="text-xl leading-relaxed" style={{ color: "var(--color-text-sub)" }}>
          College baseball programs are making six-figure roster decisions
          on gut feel, film, and word of mouth. The transfer window moves fast
          and the top players are off the board before the manual process
          catches up.
        </p>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="py-28 section-divider theme-bg" id="features">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-heading text-5xl sm:text-6xl font-bold mb-6">
            Everything your staff needs.{" "}
            <span className="gold-gradient">Nothing it doesn't.</span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: "var(--color-text-muted)" }}>
            Built by coaches and data engineers who know what D1 programs
            actually need to make faster, smarter roster decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="card-border rounded-lg p-7 hover:border-gold/35 transition-colors duration-300 group"
            >
              <div className="flex items-start mb-5">
                <div className="w-12 h-12 rounded bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                  <f.icon size={22} className="text-gold" />
                </div>
              </div>
              <h3 className="font-heading text-2xl font-semibold mb-3 tracking-wide">
                {f.title}
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricsBar() {
  return (
    <section className="py-20 section-divider" style={{ background: "var(--color-bg-mid)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {METRICS.map((m) => (
            <div key={m.label} className="text-center">
              <div className="font-heading text-5xl sm:text-6xl font-bold text-gold mb-2">
                {m.value}
              </div>
              <div className="text-base tracking-wide" style={{ color: "var(--color-text-muted)" }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="py-28 section-divider" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-heading text-5xl sm:text-6xl font-bold mb-6">
            Up and running before your next recruiting call.
          </h2>
          <p className="text-xl max-w-xl mx-auto" style={{ color: "var(--color-text-muted)" }}>
            Three steps. No onboarding calls with your data team. No
            spreadsheet imports. Data that's ready when you are.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {HOW_IT_WORKS.map((item, i) => (
            <div key={item.step} className="relative">
              <div className="flex items-center gap-4 mb-5">
                <span className="font-heading text-6xl font-bold leading-none" style={{ color: "rgba(212,175,55,0.2)" }}>
                  {item.step}
                </span>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-full w-full h-px bg-gradient-to-r from-gold/20 to-transparent -translate-x-4" />
                )}
              </div>
              <h3 className="font-heading text-2xl font-semibold mb-3 tracking-wide">
                {item.title}
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatYouGet() {
  const bullets = [
    "Full D1 + JUCO database — 15,000+ hitters and pitchers tracked",
    "Every projected hitter and pitcher stat your staff cares about (oWAR, pWAR, pWRC+, pRV+, and the full slash line)",
    "Market valuation by conference tier, position, and depth role",
    "Transfer projections with handedness-aware park factors and JUCO district weights",
    "2025 championship benchmarks for Team Builder (national + all conferences)",
    "Daily portal updates with contact info, watchlists, and a prioritized activity feed",
    "PDF scouting reports with your program's numbers baked in",
  ];

  return (
    <section className="py-28 section-divider">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="font-heading text-5xl sm:text-6xl font-bold mb-8">
              The numbers your staff{" "}
              <span className="gold-gradient">actually needs.</span>
            </h2>
            <p className="text-xl leading-relaxed mb-8" style={{ color: "var(--color-text-sub)" }}>
              Every projection accounts for your park, your conference, and
              your program's market tier. SEC programs see SEC pricing. Mid
              majors see mid major pricing. Same player — the right number
              for you.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-navy font-heading font-semibold text-lg tracking-wide hover:gap-3 hover:text-gold-dark transition-all duration-200"
            >
              Get access for your program <ChevronRight size={18} />
            </a>
          </div>
          <div className="space-y-4">
            {bullets.map((b) => (
              <div key={b} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-gold mt-0.5 flex-shrink-0" />
                <span className="text-base leading-relaxed" style={{ color: "var(--color-text-sub)" }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    program: "",
    role: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", program: "", role: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded px-4 py-3.5 text-base focus:outline-none transition-colors duration-200";
  const inputStyle = {
    background: "var(--color-input-bg)",
    border: "1px solid var(--color-input-border)",
    color: "var(--color-text)",
  };

  return (
    <section className="py-28 section-divider" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-heading text-5xl sm:text-6xl font-bold mb-6">
            Ready to see it for your program?
          </h2>
          <p className="text-xl max-w-xl mx-auto" style={{ color: "var(--color-text-muted)" }}>
            RSTR IQ is invite-only. Reach out and we'll set up a live
            walkthrough with your staff.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 max-w-5xl mx-auto">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="card-border rounded-lg p-8 gold-glow">
              {status === "sent" ? (
                <div className="text-center py-12">
                  <CheckCircle2 size={52} className="text-gold mx-auto mb-4" />
                  <h3 className="font-heading text-3xl font-bold mb-3" style={{ color: "var(--color-text)" }}>
                    Request received.
                  </h3>
                  <p className="text-lg" style={{ color: "var(--color-text-muted)" }}>
                    We'll be in touch within 24 hours to schedule your walkthrough.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2 tracking-wide uppercase" style={{ color: "var(--color-text-muted)" }}>
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputClass} style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2 tracking-wide uppercase" style={{ color: "var(--color-text-muted)" }}>
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="coach@university.edu"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputClass} style={inputStyle}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2 tracking-wide uppercase" style={{ color: "var(--color-text-muted)" }}>
                        Program
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="University of ..."
                        value={form.program}
                        onChange={(e) => setForm({ ...form, program: e.target.value })}
                        className={inputClass} style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2 tracking-wide uppercase" style={{ color: "var(--color-text-muted)" }}>
                        Role
                      </label>
                      <select
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className={`${inputClass} cursor-pointer`} style={inputStyle}
                      >
                        <option value="" disabled>Select role</option>
                        <option>Head Coach</option>
                        <option>Assistant Coach</option>
                        <option>Recruiting Coordinator</option>
                        <option>Director of Operations</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-2 tracking-wide uppercase" style={{ color: "var(--color-text-muted)" }}>
                      Anything specific you want to see?
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Transfer portal targets, market valuations, team building scenarios..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${inputClass} resize-none`} style={inputStyle}
                    />
                  </div>
                  {status === "error" && (
                    <p className="text-red-400 text-base">
                      Something went wrong. Email us at peyton.beard@rstriq.com.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-navy text-white font-heading font-semibold text-lg py-4 rounded disabled:opacity-60 hover:bg-navy-light transition-colors duration-200 tracking-wide flex items-center justify-center gap-2"
                  >
                    {status === "sending" ? (
                      "Sending..."
                    ) : (
                      <>Request a Demo <ArrowRight size={18} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2 flex flex-col justify-center gap-10">
            <div>
              <h3 className="font-heading text-xl font-semibold mb-6 tracking-wide" style={{ color: "var(--color-text)" }}>
                Or reach us directly
              </h3>
              <div className="space-y-6">
                {[CONTACT.peyton, CONTACT.trevor].map((c) => (
                  <div key={c.email} className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                      <span className="font-heading text-navy font-bold text-sm">
                        {c.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-base" style={{ color: "var(--color-text)" }}>{c.name}</div>
                      <a
                        href={`mailto:${c.email}`}
                        className="text-base text-navy hover:text-gold-dark transition-colors duration-200 flex items-center gap-1.5 mt-0.5"
                      >
                        <Mail size={13} />
                        {c.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg p-6 border" style={{ borderColor: "var(--color-border)", background: "rgba(212,175,55,0.05)" }}>
              <div className="flex items-center gap-2 mb-3">
                <Zap size={15} className="text-gold" />
                <span className="text-sm font-semibold text-gold uppercase tracking-wider">
                  What to expect
                </span>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Live walkthrough with your data pre-loaded",
                  "No commitment, response within 24 hours",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: "var(--color-text-sub)" }}>
                    <CheckCircle2 size={14} className="text-gold flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              Already have access?{" "}
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy hover:text-gold-dark transition-colors duration-200 inline-flex items-center gap-1 underline underline-offset-2"
              >
                Log into RSTR IQ <ExternalLink size={11} />
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t py-10" style={{ background: "#0d1b3e", borderColor: "rgba(160,136,32,0.2)" }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/rstr-iq-logo.png" alt="RSTR IQ" className="h-6 w-auto" />
          <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Roster Intelligence for College Baseball
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm" style={{ color: "var(--color-text-muted)" }}>
          <a href="#features" className="transition-colors duration-200 hover:text-gold-dark underline-offset-4 hover:underline hover:decoration-gold-dark">Features</a>
          <a href="#how-it-works" className="transition-colors duration-200 hover:text-gold-dark underline-offset-4 hover:underline hover:decoration-gold-dark">How It Works</a>
          <a href="#contact" className="transition-colors duration-200 hover:text-gold-dark underline-offset-4 hover:underline hover:decoration-gold-dark">Contact</a>
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-gold-dark flex items-center gap-1"
          >
            App <ExternalLink size={11} />
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-6 pt-6 border-t border-white/5">
        <p className="text-center text-xs" style={{ color: "var(--color-text-muted)" }}>
          © {new Date().getFullYear()} RSTR IQ. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ─── App ────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen font-body theme-bg">
      <Nav />
      <main>
        <Hero />
        <ScreenshotCarousel />
        <Problem />
        <Features />
        <MetricsBar />
        <HowItWorks />
        <WhatYouGet />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

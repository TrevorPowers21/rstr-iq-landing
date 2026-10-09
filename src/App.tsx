import { useState, FormEvent } from "react";
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
  Users,
  ClipboardList,
  Target,
} from "lucide-react";



// ─── Config — update these before deploying ────────────────────────────────
const APP_URL = "https://portal.rstriq.com";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqejolgb";
const CONTACT = {
  peyton: { name: "Peyton Beard", email: "peyton.beard@rstriq.com" },
  trevor: { name: "Trevor Powers", email: "trevor.powers@rstriq.com" },
};

// ─── Data ───────────────────────────────────────────────────────────────────
const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Your program gets onboarded",
    description:
      "Once your program is set up, every player is projected for your program and every roster decision, player, and dollar is tracked in one place.",
  },
  {
    step: "02",
    title: "Open and get to work.",
    description:
      "Every dashboard is set up for your staff to make the best roster decisions and build the right development plan for every player.",
  },
  {
    step: "03",
    title: "Build rosters. Develop talent. Win.",
    description:
      "Build your roster against championship benchmarks, develop every player with lab-level insights and post-game reports, and prepare for every opponent.",
  },
];

const METRICS = [
  { label: "Players Tracked", value: "15,000+" },
  { label: "Metrics Per Player", value: "20+" },
  { label: "Data Refresh", value: "Daily" },
  { label: "Interface for Every Roster Decision", value: "One" },
];

// ─── Workflows ─────────────────────────────────────────────────────────────

const WORKFLOW_GROUPS = [
  {
    key: "identify",
    label: "Identify",
    summary: "Find the right players for your program before anyone else does.",
    items: [
      {
        icon: Database,
        title: "Player Dashboard",
        description:
          "Every player projected and valued at your program, sortable by any stat.",
        bullets: [
          "Projections precomputed for your park and conference",
          "Hitters and pitchers ranked for your program",
          "Projected stats for every hitter and pitcher",
        ],
      },
      {
        icon: Activity,
        title: "Transfer Portal",
        description:
          "Portal entries flow in daily, and any player can be projected at your school in a click.",
        bullets: [
          "Daily portal updates with status badges",
          "Contact info, GPA, and athletic aid in one place",
          "Activity feed for the players you're watching",
        ],
      },
      {
        icon: Users,
        title: "Freshman Recruiting",
        description:
          "A recruiting board for high school prospects, built on the same data your portal targets use.",
        bullets: [
          "Recruit board shared across your staff",
          "Showcase and event data measured against D1 standards",
          "Path to productivity by class year",
        ],
      },
      {
        icon: DollarSign,
        title: "Financial Management",
        description:
          "Organize where your money is going and make sure it's on the right players.",
        bullets: [
          "Financial organization by source",
          "Roster budget tracked as you build",
        ],
      },
    ],
  },
  {
    key: "develop",
    label: "Develop",
    summary: "Help the players you have reach their ceiling.",
    items: [
      {
        icon: TrendingUp,
        title: "Player Development",
        description:
          "Track each player's progress against D1 benchmarks, with practice data your program owns.",
        bullets: [
          "Practice data in a program-owned database",
          "Progress measured against D1 percentiles",
          "Development goals tied to projected value",
        ],
      },
      {
        icon: ClipboardList,
        title: "Post-Game Reports",
        description:
          "Every game broken down pitch by pitch, ready for your staff the next morning.",
        bullets: [
          "Game log and scoreboard for every game",
          "Hitter and pitcher breakdowns",
          "Coach and player reports ready to export",
        ],
      },
      {
        icon: Target,
        title: "Lab-Level Insights",
        description:
          "Lab-level breakdowns for every pitcher and hitter, showing exactly where each player can get better.",
        bullets: [
          "Pitch shape and arsenal breakdowns",
          "Swing decisions and batted-ball quality",
          "Trends over time against D1 benchmarks",
        ],
      },
    ],
  },
  {
    key: "win",
    label: "Win",
    summary: "Build the roster, prepare for every opponent, and maximize the development of your whole roster.",
    items: [
      {
        icon: BarChart3,
        title: "Team Builder",
        description:
          "Plan next year's roster slot by slot, set your depth, and see how it stacks up before you commit.",
        bullets: [
          "Roster scenarios built slot by slot",
          "Depth charts and roster needs by position",
          "Benchmarks against conference and national champions",
        ],
      },
      {
        icon: FileText,
        title: "Scouting Reports",
        description:
          "Prepare for every opponent with reports on their lineup and pitching staff.",
        bullets: [
          "Opponent lineup and pitching staff breakdowns",
          "Built for your staff and your players",
          "Ready to export before every series",
        ],
      },
    ],
  },
];

function Workflows() {
  const [active, setActive] = useState(0);
  const group = WORKFLOW_GROUPS[active];

  return (
    <section className="py-28 section-divider theme-bg" id="platform">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <h2 className="font-heading text-5xl sm:text-6xl font-bold mb-8">
            Roster decisions don't have time to wait on a spreadsheet.
          </h2>
          <p className="text-xl leading-relaxed text-balance" style={{ color: "var(--color-text-sub)" }}>
            College baseball programs are making six-figure roster decisions
            on gut feel, film, and word of mouth. Who to chase, how to develop
            them, and building a roster that wins. The decisions never stop,
            and the best programs make them fastest.
          </p>
        </div>

        {/* Selector */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-full border p-1.5" style={{ borderColor: "var(--color-border)", background: "var(--color-bg-card)" }}>
            {WORKFLOW_GROUPS.map((g, i) => (
              <button
                key={g.key}
                onClick={() => setActive(i)}
                className={`font-heading text-base sm:text-lg font-semibold uppercase tracking-[0.15em] px-5 sm:px-8 py-2.5 rounded-full transition-colors duration-200 ${
                  i === active ? "bg-navy text-white" : "text-slate-500 hover:text-gold-dark"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
        <p className="text-center text-lg mb-12" style={{ color: "var(--color-text-muted)" }}>
          {group.summary}
        </p>

        {/* Workflow cards */}
        <div className={`grid gap-6 mx-auto md:grid-cols-2 ${group.items.length === 3 ? "lg:grid-cols-3 max-w-6xl" : "max-w-5xl"}`}>
          {group.items.map((item) => (
            <div key={item.title} className="card-border rounded-lg p-8 text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded flex items-center justify-center" style={{ background: "rgba(160,136,32,0.1)" }}>
                  <item.icon size={20} style={{ color: "var(--color-gold)" }} />
                </div>
                <h3 className="font-heading text-2xl font-semibold">{item.title}</h3>
              </div>
              <p className="text-base leading-relaxed mb-5" style={{ color: "var(--color-text-sub)" }}>
                {item.description}
              </p>
              <ul className="space-y-2">
                {item.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-text-sub)" }}>
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: "var(--color-gold)" }} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Nav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur border-b transition-colors duration-200"
      style={{ background: "var(--color-nav-bg)", borderColor: "var(--color-section-div)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="shrink-0" aria-label="RSTR IQ home">
          {/* Trimmed copy of rstr-iq-logo.png: the original has ~30% empty space on the right */}
          <img src="/rstr-iq-logo-trim.png" alt="RSTR IQ" className="h-12 sm:h-16 w-auto" style={{ filter: "brightness(0) saturate(100%) invert(4%) sepia(98%) saturate(1167%) hue-rotate(207deg)" }} />
        </a>
        <div className="flex items-center gap-3">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex text-sm hover:text-gold-dark transition-colors duration-200 items-center gap-1"
            style={{ color: "var(--color-text-muted)" }}
          >
            Access the App <ExternalLink size={13} className="opacity-70" />
          </a>
          <a
            href="#contact"
            className="text-sm font-medium bg-navy text-white px-4 py-2 rounded hover:bg-navy-light transition-colors duration-200 whitespace-nowrap"
          >
            Request a Demo
          </a>
        </div>
      </div>
    </nav>
  );
}

// Square marks get more height than wide wordmarks so they read at equal weight.
const CONFERENCES = [
  { name: "SEC", logo: "/conferences/sec.svg", height: "h-14" },
  { name: "The Summit League", logo: "/conferences/summit.svg", height: "h-12" },
  { name: "Big Ten", logo: "/conferences/big-ten.svg", height: "h-9" },
  { name: "American Athletic Conference", logo: "/conferences/american.svg", height: "h-14" },
  { name: "ACC", logo: "/conferences/acc.svg", height: "h-8" },
  { name: "Pac-12", logo: "/conferences/pac-12.svg", height: "h-14" },
];

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
        <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-10" style={{ color: "var(--color-text)" }}>
          The Roster Intelligence Platform
          <br />
          <span className="gold-gradient">Built for College Baseball</span>
        </h1>

        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-6">
          <span className="h-px w-6 sm:w-20" style={{ background: "var(--color-text)" }} />
          <p className="font-heading text-base sm:text-2xl font-semibold uppercase tracking-[0.18em] sm:tracking-[0.3em] whitespace-nowrap" style={{ color: "var(--color-text)" }}>
            Identify. Develop. Win.
          </p>
          <span className="h-px w-6 sm:w-20" style={{ background: "var(--color-text)" }} />
        </div>

        <p className="text-xl sm:text-2xl max-w-3xl mx-auto mb-14 leading-relaxed text-balance" style={{ color: "var(--color-text-sub)" }}>
          Data-driven projections to find the best players for your program
          and player development tools to help them reach their ceiling. All
          in one interface.
        </p>

        <div>
          <p className="text-sm font-medium tracking-wider uppercase mb-8" style={{ color: "var(--color-text-muted)" }}>
            Proud to be represented in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16">
            {CONFERENCES.map((c) => (
              <img
                key={c.name}
                src={c.logo}
                alt={c.name}
                title={c.name}
                className={`${c.height} w-auto`}
              />
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-center">
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

function MetricsBar() {
  return (
    <section className="py-24 section-divider" style={{ background: "var(--color-bg-mid)" }} id="features">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl sm:text-6xl font-bold mb-6">
            Everything your staff needs.{" "}
            <span className="gold-gradient">Nothing it doesn't.</span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto text-balance" style={{ color: "var(--color-text-muted)" }}>
            Built by coaches, data science, and technical engineers who know
            what D1 programs actually need to make faster, smarter roster
            decisions.
          </p>
        </div>
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
          <h2 className="font-heading text-5xl sm:text-6xl font-bold">
            Up and running before your next practice.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {HOW_IT_WORKS.map((item, i) => (
            <div key={item.step} className="relative">
              <div className="flex items-center gap-4 mb-5">
                <span className="font-heading text-6xl font-bold leading-none" style={{ color: "var(--color-gold)" }}>
                  {item.step}
                </span>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-full w-full h-px bg-gradient-to-r from-gold/50 to-transparent -translate-x-4" />
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
    "Every player projected for your program",
    "Every projected hitter and pitcher stat your staff cares about, including the full slash line",
    "Daily portal updates with contact info, watchlists, and a prioritized activity feed",
    "Freshman recruiting board shared across your staff",
    "Development plans with lab-level pitching and hitting insights",
    "Post-game reports after every game",
    "Team Builder with 2025 championship benchmarks (national + all conferences)",
    "Financial management organized by source",
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
              Every projection is built for your program, not a national
              average. Same player, the right number for you, whether you're
              recruiting him, developing him, or building around him.
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
    interests: [] as string[],
    notes: "",
  });

  const toggleInterest = (title: string) =>
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(title)
        ? f.interests.filter((t) => t !== title)
        : [...f.interests, title],
    }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, interests: form.interests.join(", ") }),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", program: "", role: "", interests: [], notes: "" });
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
                    <label className="block text-sm mb-1 tracking-wide uppercase" style={{ color: "var(--color-text-muted)" }}>
                      What are you interested in?
                    </label>
                    <p className="text-sm mb-3" style={{ color: "var(--color-text-muted)" }}>
                      Select all that apply.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {WORKFLOW_GROUPS.flatMap((g) => g.items).map((item) => {
                        const selected = form.interests.includes(item.title);
                        return (
                          <button
                            key={item.title}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => toggleInterest(item.title)}
                            className={`relative flex items-center justify-center text-center text-sm leading-tight px-3 sm:px-2 sm:whitespace-nowrap py-2.5 min-h-[44px] rounded border transition-colors duration-200 ${
                              selected
                                ? "bg-navy text-white border-navy"
                                : "border-navy/20 text-navy hover:border-gold-dark hover:text-gold-dark"
                            }`}
                          >
                                                        {item.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-2 tracking-wide uppercase" style={{ color: "var(--color-text-muted)" }}>
                      Notes <span className="normal-case tracking-normal">(optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Anything else we should know about your program?"
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
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
  const link = "text-white/70 hover:text-gold transition-colors duration-200";
  return (
    <footer className="bg-navy border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-5">
            <img src="/rstr-iq-logo-trim.png" alt="RSTR IQ" className="h-12 w-auto" />
            <p className="hidden lg:block text-sm text-white/60 pl-5 border-l border-white/15">Roster Intelligence for College Baseball</p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium tracking-wide">
            <a href="#platform" className={link}>Platform</a>
            <a href="#how-it-works" className={link}>How It Works</a>
            <a href="#contact" className={link}>Contact</a>
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" className={`${link} inline-flex items-center gap-1`}>
              Access the App <ExternalLink size={12} />
            </a>
          </nav>
        </div>
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} RSTR IQ. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {[CONTACT.peyton, CONTACT.trevor].map((c) => (
              <a key={c.email} href={`mailto:${c.email}`} className="hover:text-gold transition-colors duration-200">
                {c.email}
              </a>
            ))}
          </div>
        </div>
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
        <Workflows />
        <MetricsBar />
        <HowItWorks />
        <WhatYouGet />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

import { useState, FormEvent, useEffect } from "react";

// Hidden, unlisted page — not linked from nav or sitemap. Reachable only by
// direct URL (see main.tsx for the route match). Gate is a simple
// name+email form via the same Formspree endpoint already used for the
// contact form on the main landing page — no new backend/account needed.
// Storage key namespaced so it can never collide with anything else.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqejolgb";
const UNLOCK_KEY = "rstr-iq-investor-preview-unlocked";
const VIDEO_SRC = "/videos/investor-preview.mp4";

export default function InvestorPreview() {
  const [unlocked, setUnlocked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem(UNLOCK_KEY) === "true") setUnlocked(true);
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          _subject: "RSTR IQ investor preview — video unlocked",
          message: `${name} (${email}) just unlocked the investor preview video.`,
        }),
      });
      if (!res.ok) throw new Error("Could not verify — try again.");
      sessionStorage.setItem(UNLOCK_KEY, "true");
      setUnlocked(true);
    } catch {
      setError("Something went wrong. Try again, or reach out directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-8">
          <img src="/rstr-iq-logo.png" alt="RSTR IQ" className="h-10 w-auto" />
        </div>

        {!unlocked ? (
          <div className="bg-navy-light/60 border border-gold-muted rounded-2xl p-8 sm:p-10">
            <h1 className="font-heading text-2xl sm:text-3xl text-white text-center mb-2">
              You've been invited to a preview
            </h1>
            <p className="font-body text-white/60 text-center mb-8">
              Enter your name and email to view it.
            </p>
            <form onSubmit={onSubmit} className="space-y-4 max-w-sm mx-auto">
              <div>
                <label className="block font-body text-sm text-white/70 mb-1.5" htmlFor="inv-name">
                  Name
                </label>
                <input
                  id="inv-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg bg-navy border border-gold-muted px-3.5 py-2.5 font-body text-white placeholder:text-white/30 focus:outline-none focus:border-gold"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label className="block font-body text-sm text-white/70 mb-1.5" htmlFor="inv-email">
                  Email
                </label>
                <input
                  id="inv-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg bg-navy border border-gold-muted px-3.5 py-2.5 font-body text-white placeholder:text-white/30 focus:outline-none focus:border-gold"
                  placeholder="jane@fund.com"
                />
              </div>
              {error && <p className="font-body text-sm text-red-400">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-gold hover:bg-gold-light disabled:opacity-60 text-navy font-heading font-medium py-2.5 transition-colors"
              >
                {submitting ? "Verifying..." : "View preview"}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-navy-light/60 border border-gold-muted rounded-2xl p-4 sm:p-6">
            <video
              src={VIDEO_SRC}
              controls
              autoPlay
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
              poster="/screen-overview.png"
              className="w-full rounded-lg"
            >
              Your browser doesn't support embedded video.
            </video>
          </div>
        )}
      </div>
    </div>
  );
}

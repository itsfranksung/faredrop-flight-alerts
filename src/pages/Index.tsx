import { Link } from "react-router";
import { BellRing, Plane, Radar, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { useReveal } from "@/hooks/use-reveal";

const features = [
  { icon: Radar, code: "TPE → NRT", title: "盯緊熱門航線 (Always-on route watching)", body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。" },
  { icon: BellRing, code: "FARE ↓", title: "達標自動通知 (Target-price email alerts)", body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。" },
  { icon: XCircle, code: "NO LOCK-IN", title: "隨時取消 (Cancel anytime)", body: "月訂閱制，不想用隨時停，沒有綁約。" },
];

export function Index() {
  useReveal();
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-white/40 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo />
          <Button asChild variant="hero" size="sm" className="rounded-full px-5">
            <Link to="/signin">Sign in / 登入</Link>
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden bg-hero">
        <div aria-hidden className="cloud left-[-6%] top-24 h-24 w-80" />
        <div aria-hidden className="cloud right-[-4%] top-56 h-20 w-72" />
        <div aria-hidden className="cloud bottom-10 left-1/3 h-16 w-96" />
        {/* Decorative flight path arcing over the hero. */}
        <svg aria-hidden viewBox="0 0 1200 300" className="pointer-events-none absolute inset-x-0 top-10 mx-auto w-full max-w-6xl opacity-70" fill="none">
          <path d="M40 260 C 320 20, 880 20, 1160 200" stroke="oklch(0.58 0.18 250 / 45%)" strokeWidth="2.5" strokeDasharray="2 12" strokeLinecap="round" />
          <circle cx="40" cy="260" r="6" fill="oklch(0.58 0.18 250 / 60%)" />
          <circle cx="1160" cy="200" r="6" fill="oklch(0.72 0.17 48 / 80%)" />
        </svg>

        <div className="relative mx-auto max-w-4xl px-6 pb-28 pt-24 text-center sm:pt-32">
          <p className="reveal inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-accent-foreground shadow-card backdrop-blur">
            <Plane className="size-3.5 -rotate-45 text-sunset" />
            機票降價通知 · Taipei → Tokyo · Seoul
          </p>
          <h1 className="reveal mt-7 text-5xl font-extrabold tracking-tight sm:text-7xl">
            <span className="text-gradient">Flight Price</span> Notifier
          </h1>
          <p className="reveal mt-6 text-xl font-semibold sm:text-2xl">設定航線與目標價，機票降價就通知你</p>
          <p className="reveal mt-3 text-muted-foreground">Set a route and a target price — we email you when the fare drops.</p>
          <div className="reveal mt-10 flex justify-center gap-3">
            <Button asChild variant="hero" size="lg" className="h-12 rounded-full px-8 text-base">
              <Link to="/signup">Get started / 免費註冊</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-10 max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="reveal group overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-card transition-transform hover:-translate-y-1"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon className="size-5" />
                </span>
                <span className="font-mono text-xs font-semibold tracking-widest text-muted-foreground">{f.code}</span>
              </div>
              <div className="ticket-perforation my-6" />
              <h3 className="text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border bg-white/60">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-muted-foreground">
          © 2026 Flight Price Notifier
        </div>
      </footer>
    </div>
  );
}

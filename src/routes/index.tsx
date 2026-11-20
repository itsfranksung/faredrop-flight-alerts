import { createFileRoute, Link } from "@tanstack/react-router";
import { BellRing, Radar, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flight Price Notifier 機票降價通知 — Fare drop alerts from Taipei" },
      { name: "description", content: "設定航線與目標價，機票降價就通知你。Set a route and a target price — we email you when the fare drops." },
      { property: "og:title", content: "Flight Price Notifier 機票降價通知" },
      { property: "og:description", content: "Set a route and a target price — we email you when the fare drops." },
    ],
  }),
  component: Index,
});

const features = [
  { icon: Radar, title: "盯緊熱門航線 (Always-on route watching)", body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。" },
  { icon: BellRing, title: "達標自動通知 (Target-price email alerts)", body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。" },
  { icon: XCircle, title: "隨時取消 (Cancel anytime)", body: "月訂閱制，不想用隨時停，沒有綁約。" },
];

function Index() {
  useReveal();
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo />
          <Button asChild variant="hero" size="sm">
            <Link to="/signin">Sign in / 登入</Link>
          </Button>
        </div>
      </header>

      <section className="bg-hero">
        <div className="mx-auto max-w-4xl px-6 pb-24 pt-24 text-center sm:pt-32">
          <p className="reveal inline-block rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
            機票降價通知 · Taipei → Tokyo · Seoul
          </p>
          <h1 className="reveal mt-6 text-5xl font-extrabold tracking-tight sm:text-7xl">
            <span className="text-gradient">Flight Price</span> Notifier
          </h1>
          <p className="reveal mt-6 text-xl font-medium sm:text-2xl">設定航線與目標價，機票降價就通知你</p>
          <p className="reveal mt-3 text-muted-foreground">Set a route and a target price — we email you when the fare drops.</p>
          <div className="reveal mt-10 flex justify-center gap-3">
            <Button asChild variant="hero" size="lg">
              <Link to="/signup">Get started / 免費註冊</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="reveal rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/50"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="grid size-11 place-items-center rounded-xl bg-accent text-primary">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-muted-foreground">
          © 2026 Flight Price Notifier
        </div>
      </footer>
    </div>
  );
}

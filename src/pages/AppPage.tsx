import { useNavigate, useOutletContext } from "react-router";
import type { User } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, Plane, Radar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

export function AppPage() {
  const { user } = useOutletContext<{ user: User }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate("/signin", { replace: true });
  }

  return (
    <div className="min-h-screen bg-background bg-hero bg-no-repeat">
      <header className="border-b border-white/40 bg-white/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo />
          <Button variant="outline" size="sm" className="rounded-full bg-white/80" onClick={signOut}>
            <LogOut /> Sign out / 登出
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-20">
        <div className="reveal is-visible overflow-hidden rounded-3xl border border-border bg-card shadow-card">
          <div className="flex items-center justify-between bg-gradient-to-r from-primary to-primary-glow px-8 py-4 text-primary-foreground">
            <span className="font-mono text-xs font-semibold tracking-widest">BOARDING PASS</span>
            <Plane className="size-5 -rotate-45" />
          </div>
          <div className="p-10 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-accent text-primary">
              <Radar className="size-6" />
            </span>
            <h1 className="mt-6 break-all text-3xl font-bold tracking-tight">Hi {user.email}</h1>
            <div className="ticket-perforation mx-[-2.5rem] my-6 [&::after]:right-[-10px] [&::before]:left-[-10px]" />
            <p className="text-lg text-foreground/90">
              你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Your dashboard is coming soon. Route-subscription will be added in the next milestone.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

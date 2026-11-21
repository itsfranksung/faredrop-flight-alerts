import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const isSignUp = mode === "signup";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { data, error } = isSignUp
      ? await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/app` },
        })
      : await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (!data.session) {
      toast.success("請到信箱確認帳號 / Check your email to confirm.");
      return;
    }
    navigate("/app", { replace: true });
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background bg-hero">
      <header className="mx-auto w-full max-w-6xl px-6 py-5">
        <Logo />
      </header>
      <main className="flex flex-1 items-center justify-center px-6 pb-16">
        <div className="reveal is-visible w-full max-w-sm rounded-2xl border border-border bg-card/80 p-8 backdrop-blur">
          <h1 className="text-2xl font-bold tracking-tight">
            {isSignUp ? "Create account / 註冊" : "Sign in / 登入"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isSignUp ? "Start watching fares from Taipei." : "Welcome back."}
          </p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password / 密碼</Label>
              <Input
                id="password"
                type="password"
                autoComplete={isSignUp ? "new-password" : "current-password"}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" variant="hero" className="w-full" disabled={loading}>
              {loading ? "…" : isSignUp ? "Sign up / 註冊" : "Sign in / 登入"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isSignUp ? (
              <>Already have an account? <Link to="/signin" className="text-primary hover:underline">Sign in</Link></>
            ) : (
              <>No account yet? <Link to="/signup" className="text-primary hover:underline">Sign up</Link></>
            )}
          </p>
        </div>
      </main>
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import { Plane } from "lucide-react";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight text-foreground">
      <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-glow">
        <Plane className="size-4" />
      </span>
      <span className="hidden sm:inline">Flight Price Notifier</span>
    </Link>
  );
}

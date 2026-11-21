import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { User } from "@supabase/supabase-js";
import { useEffect, useState, type ReactNode } from "react";
import { Link, Navigate, Outlet, useRouteError, type RouteObject } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { AuthForm } from "@/components/AuthForm";
import { supabase } from "@/integrations/supabase/client";
import { reportLovableError } from "@/lib/lovable-error-reporting";
import { Index } from "@/pages/Index";
import { AppPage } from "@/pages/AppPage";

const queryClient = new QueryClient();

function Root() {
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "USER_UPDATED") queryClient.invalidateQueries();
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster />
    </QueryClientProvider>
  );
}

// Client-only gate: signed-out visitors are redirected to /signin and never see private screens.
function RequireAuth() {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") setUser(null);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  if (user === undefined) return null;
  if (!user) return <Navigate to="/signin" replace />;
  return <Outlet context={{ user }} />;
}

function Page({ title, children }: { title: string; children: ReactNode }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return children;
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent() {
  const error = useRouteError();
  useEffect(() => {
    console.error(error);
    reportLovableError(error, { boundary: "react_router_error_element" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const routes: RouteObject[] = [
  {
    element: <Root />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: "/",
        element: (
          <Page title="Flight Price Notifier 機票降價通知 — Fare drop alerts from Taipei">
            <Index />
          </Page>
        ),
      },
      {
        path: "/signin",
        element: (
          <Page title="Sign in — Flight Price Notifier">
            <AuthForm mode="signin" />
          </Page>
        ),
      },
      {
        path: "/signup",
        element: (
          <Page title="Sign up — Flight Price Notifier">
            <AuthForm mode="signup" />
          </Page>
        ),
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: "/app",
            element: (
              <Page title="Dashboard — Flight Price Notifier">
                <meta name="robots" content="noindex" />
                <AppPage />
              </Page>
            ),
          },
        ],
      },
      { path: "*", element: <NotFoundComponent /> },
    ],
  },
];

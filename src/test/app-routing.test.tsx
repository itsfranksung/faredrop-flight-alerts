import { matchRoutes } from "react-router";
import { describe, expect, it } from "vitest";

import { routes } from "@/routes";

// Match routes without rendering: pages need Supabase/network the test run lacks.
describe("App routing", () => {
  it.each(["/", "/signin", "/signup", "/app"])("matches a page for %s", (path) => {
    expect(matchRoutes(routes, path)?.at(-1)?.route.path).toBe(path);
  });

  it("falls back to not found for unknown paths", () => {
    expect(matchRoutes(routes, "/nope")?.at(-1)?.route.path).toBe("*");
  });
});

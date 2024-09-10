// This file is left here for reference, we're no longer using Hono

import authConfig from "@/auth.config";
import { applicationRoutes } from "@/server/routes/application";
import { authRoutes } from "@/server/routes/auth";
import { userRoutes } from "@/server/routes/user";
import { initAuthConfig, type AuthConfig } from "@hono/auth-js";
import { Context, Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

app.use("*", initAuthConfig(getAuthConfig));

// Public example route
app.get("/example", async (c) => {
  const auth = c.get("authUser");
  console.log("auth", auth);

  return c.json(auth);
});

// Public routes
app.route("/", authRoutes);
app.route("/application", applicationRoutes);
app.route("/user", userRoutes);

export const GET = handle(app);
export const POST = handle(app);

function getAuthConfig(c: Context): AuthConfig {
  return {
    secret: c.env.AUTH_SECRET,
    ...authConfig,
  };
}

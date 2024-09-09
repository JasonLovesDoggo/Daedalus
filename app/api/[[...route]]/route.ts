import authConfig from "@/auth.config";
import { applicationRoutes } from "@/server/routes/application";
import { authRoutes } from "@/server/routes/auth";
import { userRoutes } from "@/server/routes/user";
import { initAuthConfig, type AuthConfig } from "@hono/auth-js";
import { Context, Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

app.use("*", initAuthConfig(getAuthConfig));

// route: /api/example
app.get("/example", (c) => {
  return c.json({
    message: "Hello from example route!",
  });
});

app.get("/protected", (c) => {
  const auth = c.get("authUser");
  console.log("auth", auth);

  if (!auth) {
    return c.json({ message: "Not authenticated" }, 401);
  }

  return c.json(auth);
});

app.route("/auth", authRoutes);
app.route("/application", applicationRoutes);
app.route("/user", userRoutes);

function getAuthConfig(c: Context): AuthConfig {
  return {
    secret: c.env.AUTH_SECRET,
    ...authConfig,
  };
}

export const GET = handle(app);

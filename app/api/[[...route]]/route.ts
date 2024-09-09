import authConfig from "@/auth.config";
import { applicationRoutes } from "@/server/routes/application";
import { authRoutes } from "@/server/routes/auth";
import { userRoutes } from "@/server/routes/user";
import { initAuthConfig, type AuthConfig } from "@hono/auth-js";
import { Context, Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

const authMiddleware = initAuthConfig(getAuthConfig);

// Public example route
app.get("/example", (c) => {
  return c.json({
    message: "Hello from example route!",
  });
});

// Public routes
app.route("/", authRoutes);

// Protected routes
app.use("/application", authMiddleware);
app.route("/application", applicationRoutes);

app.use("/user", authMiddleware);
app.route("/user", userRoutes);

export const GET = handle(app);
export const POST = handle(app);

// Auth middleware setup
function getAuthConfig(c: Context): AuthConfig {
  return {
    secret: c.env.AUTH_SECRET,
    ...authConfig,
  };
}

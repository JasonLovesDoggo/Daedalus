import { applicationRoutes } from "@/server/routes/application";
import { authRoutes } from "@/server/routes/auth";
import { userRoutes } from "@/server/routes/user";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

// Public example route
app.get("/example", (c) => {
  return c.json({
    message: "Hello from example route!",
  });
});

// Public routes
app.route("/", authRoutes);
app.route("/application", applicationRoutes);
app.route("/user", userRoutes);

export const GET = handle(app);
export const POST = handle(app);

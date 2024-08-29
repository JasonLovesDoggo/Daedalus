import { applicationRoutes } from "@/server/routes/application";
import { authRoutes } from "@/server/routes/auth";
import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono().basePath("/api");

// route: /api/example
app.get("/example", (c) => {
  return c.json({
    message: "Hello from example route!",
  });
});

app.route("/", authRoutes);
app.route("/application", applicationRoutes);

export const GET = handle(app);

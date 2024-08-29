import { applicationRouter } from "@/server/application";
import { authRouter } from "@/server/auth";
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

app.route("/", authRouter);
app.route("/application", applicationRouter);

export const GET = handle(app);

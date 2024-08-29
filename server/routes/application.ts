import { Hono } from "hono";

export const app = new Hono();

// Routes for /api/application/<route>

// /api/application
app.get("/", (c) => {
  return c.text("Hello from application route!");
});

// /api/application/:id
app.get("/:id", (c) => {
  const id = c.req.param("id");

  return c.text(`Hello from a single application route with id ${id}!`);
});

export const applicationRoutes = app;

import { Hono } from "hono";

export const app = new Hono();

// Routes for /api/<route>

// /api/login
app.post("/login", (c) => {
  // TODO: Handle login

  return c.text("Hello from auth route!");
});

// /api/register
app.post("/register", (c) => {
  // TODO: Handle login

  return c.text("Hello from auth route!");
});

export const authRoutes = app;

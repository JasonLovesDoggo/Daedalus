import { Hono } from "hono";

export const app = new Hono();

// Routes for /api/auth/<route>

// /api/login
app.post("/login", (c) => {
  // TODO: Handle login

  return c.text("Hello from auth route!");
});

// /api/register
app.post("/register", (c) => {
  // TODO: Handle login

  const body = c.body;

  console.log("body", body);

  return c.text("Hello from auth route!");
});

export const authRoutes = app;

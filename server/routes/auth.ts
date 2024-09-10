import { Hono } from "hono";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/db/queries/user";
import { users } from "@/lib/db/schema";

export const app = new Hono();

// Routes for /api/auth/<route>

// /api/login
app.post("/login", (c) => {
  // TODO: Handle login

  return c.text("Hello from auth route!");
});

// /api/register
app.post("/register", async (c) => {
  const body = await c.req.json();
  // TODO: Validate body

  const existingUser = await getUserByEmail(body.email);

  if (existingUser) {
    return c.json(
      { error: "User with given email already exists." },
      {
        status: 400,
      },
    );
  }

  await db.insert(users).values({
    name: body.name,
    email: body.email,
  });

  return c.json({ message: "Hello from auth route!" });
});

export const authRoutes = app;

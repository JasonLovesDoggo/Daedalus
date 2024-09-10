import { signIn } from "@/auth";
import bcrypt from "bcryptjs";
import { Hono } from "hono";
import { AuthError } from "next-auth";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/db/queries/user";
import { users } from "@/lib/db/schema";

export const app = new Hono();

// Routes for /api/auth/<route>

// /api/login
// app.post("/login", async (c) => {
//   try {
//     const body = await c.req.json();

//     // Validate the body
//     if (!body.email || !body.password) {
//       return c.json(
//         { error: "Email and password are required." },
//         {
//           status: 400,
//         },
//       );
//     }

//     const existingUser = await getUserByEmail(body.email);

//     if (!existingUser) {
//       return c.json(
//         { error: "Could not find a user with the given email." },
//         {
//           status: 400,
//         },
//       );
//     }

//     // Prevent default redirect behavior and handle sign in
//     const result = await signIn("credentials", {
//       email: body.email,
//       password: body.password,
//       redirect: false,
//     });

//     if (!result) {
//       return c.json(
//         { error: "Invalid email or password." },
//         {
//           status: 401,
//         },
//       );
//     }

//     // If everything is successful
//     return c.json({ success: "Login successful", result });
//   } catch (error) {
//     console.error("Error during login:", error);

//     // Handle known error types
//     if (error instanceof Error) {
//       const { type, cause } = error as AuthError;
//       switch (type) {
//         case "CredentialsSignin":
//           return c.json(
//             { error: "Invalid email or password." },
//             {
//               status: 401,
//             },
//           );
//         case "CallbackRouteError":
//           return c.json(
//             { error: cause?.err?.toString() || "Callback error occurred." },
//             {
//               status: 500,
//             },
//           );
//         default:
//           return c.json(
//             { error: "An unknown error occurred." },
//             {
//               status: 500,
//             },
//           );
//       }
//     }

//     // Handle unexpected errors with a generic response
//     return c.json(
//       { error: "An unexpected error occurred." },
//       {
//         status: 500,
//       },
//     );
//   }
// });

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

  const hashedPassword = await bcrypt.hash(body.password, 10);

  await db.insert(users).values({
    name: body.name,
    email: body.email,
    password: hashedPassword,
  });

  return c.json({ success: "New user created with email " + body.email });
});

export const authRoutes = app;

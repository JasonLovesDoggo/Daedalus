import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

declare global {
  var _db: ReturnType<typeof drizzle> | undefined;
}

const connectionString = process.env.DATABASE_URL!;

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, {
  prepare: false,
  max: 1,
  idle_timeout: 20,
  connection: {
    ssl: true,
  },
});

export const db = globalThis._db || drizzle(client);

if (process.env.NODE_ENV !== "production") {
  globalThis._db = db;
}

// Run migrations
// migrate(db, { migrationsFolder: "drizzle" });

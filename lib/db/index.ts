import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";

import * as schema from "./schema";

declare global {
  var _db: ReturnType<typeof drizzle> | undefined;
}

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const db = globalThis._db || drizzle(client, { schema });

if (process.env.NODE_ENV !== "production") {
  globalThis._db = db;
}

export { db };

// Run migrations
migrate(db, { migrationsFolder: "drizzle" });

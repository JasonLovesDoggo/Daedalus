import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

import * as schema from "./schema";

declare global {
  var _db: ReturnType<typeof drizzle> | undefined;
}

const sqlite = new Database("./lib/db/sqlite.db");
const db = globalThis._db || drizzle({ client: sqlite });

if (process.env.NODE_ENV !== "production") {
  globalThis._db = db;
}

export { db };

// this is important to bring the schema into the database, otherwise the tables won't be created
// migrate(db, { migrationsFolder: "drizzle" });

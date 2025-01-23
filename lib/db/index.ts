import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

import * as schema from "./schema";

declare global {
  var _db: ReturnType<typeof drizzle<typeof schema>> | undefined;
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const db = globalThis._db || drizzle({ client: pool, schema: schema });

if (process.env.NODE_ENV !== "production") {
  globalThis._db = db;
}

// Reserved file for application-related queries that will often be used

import { eq } from "drizzle-orm";

import { db } from "..";
import { hackerApplications } from "../schema";

export const getApplicationByUserId = async (userId: string) => {
  try {
    const [application] = await db
      .select()
      .from(hackerApplications)
      .where(eq(hackerApplications.userId, userId));

    return application;
  } catch (error) {
    console.error(
      "Error fetching application in getApplicationByUserId function: ",
      error,
    );
    return null;
  }
};

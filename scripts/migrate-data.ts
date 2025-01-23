import emailTokensData from "../hc-backups/emailVerificationToken.json";
import hackerAppsData from "../hc-backups/hackerApplication.json";
import usersData from "../hc-backups/user.json";
import { db } from "../lib/db";
import {
  emailVerificationTokens,
  hackerApplications,
  users,
} from "../lib/db/schema";

async function migrateData() {
  try {
    console.log("Starting data migration...");

    // Migrate users
    console.log("Migrating users...");
    for (const user of usersData) {
      await db.insert(users).values({
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified ? new Date(user.emailVerified) : null,
        password: user.password,
        role: user.role,
        applicationStatus: user.applicationStatus,
        rsvpAt: user.rsvpAt ? new Date(user.rsvpAt) : null,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      });
    }

    // Migrate email verification tokens
    console.log("Migrating email verification tokens...");
    for (const token of emailTokensData) {
      await db.insert(emailVerificationTokens).values({
        id: token.id,
        email: token.email,
        code: token.code,
        expires: new Date(token.expires),
        createdAt: new Date(token.createdAt),
      });
    }

    // Migrate hacker applications
    console.log("Migrating hacker applications...");
    for (const app of hackerAppsData) {
      await db.insert(hackerApplications).values({
        id: app.id,
        userId: app.userId,
        firstName: app.firstName,
        lastName: app.lastName,
        age: app.age,
        pronouns: app.pronouns,
        email: app.email,
        github: app.github,
        linkedin: app.linkedin,
        personalWebsite: app.personalWebsite,
        resumeUrl: app.resume,
        shareResume: Boolean(app.shareResume),
        school: app.school,
        major: app.major,
        levelOfStudy: app.levelOfStudy,
        graduationYear: app.graduationYear,
        gender: app.gender,
        race: app.race,
        country: app.country,
        shortAnswer1: app.shortAnswer1,
        shortAnswer2: app.shortAnswer2,
        technicalInterests: app.technicalInterests,
        hackathonsAttended: app.hackathonsAttended,
        mlhCheckbox1: Boolean(app.mlhCheckbox1),
        mlhCheckbox2: Boolean(app.mlhCheckbox2),
        mlhCheckbox3: Boolean(app.mlhCheckbox3),
        submissionStatus: app.submissionStatus,
        createdAt: new Date(app.createdAt),
        updatedAt: new Date(app.updatedAt),
        internalResult: app.internalResult,
        internalNotes: app.internalNotes,
      });
    }

    console.log("Data migration completed successfully!");
  } catch (error) {
    console.error("Error during data migration:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

migrateData();

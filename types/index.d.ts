type User = {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: UserRole;
  status: ApplicationStatus;
};

type ApplicationStatus =
  | "not_applied"
  | "pending"
  | "accepted"
  | "rejected"
  | "waitlisted"
  | "cancelled";

type UserRole =
  | "admin"
  | "hacker"
  | "organizer"
  | "unassigned"
  | "mentor"
  | "volunteer"
  | "judge";

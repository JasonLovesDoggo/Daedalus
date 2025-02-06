import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";

import { getProfileWithUser } from "@/lib/db/queries/profile";
import { Platform } from "@/lib/validations/profile";
import PageWrapper from "@/components/PageWrapper";
import { ProfileForm } from "@/components/profile/ProfileForm";

export default async function EditProfilePage() {
  const user = await getCurrentUser();

  if (!user?.id) {
    redirect("/sign-in");
  }

  // Only assigned users can have profiles (e.g. hackers, orgs, mentors)
  if (user.role === "unassigned") {
    redirect("/dashboard");
  }

  const profile = await getProfileWithUser(user.id);
  console.log(profile);

  return (
    <PageWrapper className="max-w-screen-lg 3xl:max-w-screen-lg">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Edit Profile</h1>
        <p className="text-muted-foreground">
          Update your profile to share your interests, hobbies, and connect with
          others during the hackathon!
        </p>
      </div>

      <ProfileForm
        initialData={
          profile
            ? {
                bio: profile.bio,
                hobbies: profile.hobbies || "",
                integrations: profile.integrations,
              }
            : undefined
        }
      />
    </PageWrapper>
  );
}

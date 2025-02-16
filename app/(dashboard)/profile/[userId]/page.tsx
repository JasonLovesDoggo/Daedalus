import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";

import { getProfileWithUser } from "@/lib/db/queries/profile";
import { BackButton } from "@/components/ui/back-button";
import { EmptyPage } from "@/components/EmptyPage";
import PageWrapper from "@/components/PageWrapper";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileHobbies } from "@/components/profile/ProfileHobbies";
import { SocialLinkCard } from "@/components/profile/SocialLinkCard";

export default async function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const currentUser = await getCurrentUser();
  const profile = await getProfileWithUser(params.userId);

  if (!profile?.id) {
    return (
      <EmptyPage
        title="Profile Not Found"
        message="This user has not created a profile yet."
      />
    );
  }

  if (currentUser?.role === "unassigned") {
    return (
      <EmptyPage
        title="Profile Page"
        message="Sorry, this feature is only available to participants."
      />
    );
  }

  const isOwner = currentUser?.id === profile.user.id;

  return (
    <PageWrapper>
      <div className="relative space-y-8">
        <ProfileHeader
          name={profile.user.name.split(" ")[0]}
          role={profile.user.role}
          bio={profile.bio}
          isOwner={isOwner}
        />

        <div className="space-y-8">
          {profile.hobbies && <ProfileHobbies hobbies={profile.hobbies} />}

          {/* Social Links Card */}
          {profile.integrations.length > 0 && (
            <SocialLinkCard integrations={profile.integrations} />
          )}
        </div>
        <BackButton />
      </div>
    </PageWrapper>
  );
}

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";

import { getProfileWithUser } from "@/lib/db/queries/profile";
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

  if (!currentUser?.id) redirect("/");

  if (currentUser.role === "unassigned") {
    return (
      <EmptyPage
        title="Profile Page"
        message="Sorry, this page is only available to participants."
      />
    );
  }

  const profile = await getProfileWithUser(params.userId);

  if (!profile?.id) {
    redirect("/profile/edit");
  }

  const isOwner = profile.user.id === currentUser.id;

  return (
    <PageWrapper>
      <div className="relative min-h-[calc(100vh-4rem)] space-y-8">
        <ProfileHeader
          name={profile.user.name}
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
      </div>
    </PageWrapper>
  );
}

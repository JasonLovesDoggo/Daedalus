import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";
import {
  Github,
  Instagram,
  LinkedinIcon,
  Radio,
  User2,
  Youtube,
} from "lucide-react";

import { getProfileWithUser } from "@/lib/db/queries/profile";
import { Platform } from "@/lib/validations/profile";
import { EmptyPage } from "@/components/EmptyPage";
import PageWrapper from "@/components/PageWrapper";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileHobbies } from "@/components/profile/ProfileHobbies";

const platformIcons: Record<Platform, React.ReactNode> = {
  github: <Github className="size-5" />,
  linkedin: <LinkedinIcon className="size-5" />,
  instagram: <Instagram className="size-5" />,
  youtube: <Youtube className="size-5" />,
  twitch: <Radio className="size-5" />,
  personal: <User2 className="size-5" />,
};

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
            <div className="group relative overflow-hidden rounded-lg border-2 border-primary/20 p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-info/10 via-primaryLight/10 to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <h2 className="mb-4 text-xl font-semibold text-textPrimary">
                Connect With Me
              </h2>

              <div className="grid gap-3 sm:grid-cols-2">
                {profile.integrations.map((integration, index) => (
                  <a
                    key={index}
                    href={integration.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-md bg-white/80 p-3 text-textSecondary shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/10 hover:shadow-md"
                  >
                    {platformIcons[integration.platform]}
                    <span className="capitalize">{integration.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}

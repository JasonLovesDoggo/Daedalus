import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";

import { getProfileWithUser } from "@/lib/db/queries/profile";
import { EmptyPage } from "@/components/EmptyPage";

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
    <div className="flex flex-col gap-8 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{profile.user.name}</h1>
        <p className="capitalize text-muted-foreground">{profile.user.role}</p>
      </div>

      {/* Bio */}
      {profile.bio && (
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">About</h2>
          <p className="whitespace-pre-wrap text-muted-foreground">
            {profile.bio}
          </p>
        </div>
      )}

      {/* Interests */}
      {profile.hobbies && (
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Interests and Hobbies</h2>
          <p className="text-muted-foreground">{profile.hobbies}</p>
        </div>
      )}

      {/* Links */}
      {profile.integrations.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Links</h2>
          <div className="flex flex-col gap-1">{/* TODO */}</div>
        </div>
      )}
    </div>
  );
}

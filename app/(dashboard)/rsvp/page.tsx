import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";

import PageWrapper from "@/components/PageWrapper";
import RSVPForm from "@/components/RSVPForm";

const RSVPPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.id) {
    redirect("/");
  }

  // Ensure that the user is qualified to RSVP
  // - user must be accepted
  // - user must not ALREADY be a hacker
  const canRsvp =
    currentUser?.status === "accepted" && currentUser.role !== "hacker";

  if (!canRsvp) {
    redirect("/");
  }

  return (
    <PageWrapper className="3xl:max-w-screen-lg">
      <div className="mb-8">
        <div className="mb-2 w-fit bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
          <h1 className="font-rubik text-3xl font-bold md:text-4xl">RSVP</h1>
        </div>
        <p className="mb-1 max-w-2xl text-textMuted max-md:text-sm">
          You were accepted to Hack Canada. Please complete the form below
          within one week of your acceptance to RSVP for the event.
        </p>
      </div>

      <RSVPForm />
    </PageWrapper>
  );
};

export default RSVPPage;

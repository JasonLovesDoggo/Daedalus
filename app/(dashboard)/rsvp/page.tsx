import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";

import RSVPForm from "@/components/dashboard/RSVPForm";
import PageWrapper from "@/components/PageWrapper";

const RSVPPage = async () => {
  const currentUser = await getCurrentUser();

  // if (!currentUser || !currentUser.id) {
  //   redirect("/");
  // }

  // // Ensure that the user is qualified to RSVP
  // if (currentUser.status !== "accepted" || currentUser.role === "hacker") {
  //   redirect("/dashboard");
  // }

  return (
    <PageWrapper>
      <div className="mb-8">
        <div className="mb-2 w-fit bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
          <h1 className="font-rubik text-3xl font-bold">RSVP</h1>
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

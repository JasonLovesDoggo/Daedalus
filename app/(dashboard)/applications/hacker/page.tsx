import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";

import { getHackerApplicationByUserId } from "@/lib/db/queries/application";
import HackerApplicationForm from "@/components/applications/HackerApplicationForm";
import PageWrapper from "@/components/PageWrapper";

const HackerApplicationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.id) {
    redirect("/sign-up");
  }

  const existingApplication = await getHackerApplicationByUserId(
    currentUser.id,
  );

  return <HackerApplicationForm existingApplication={existingApplication} />;
};
export default HackerApplicationPage;

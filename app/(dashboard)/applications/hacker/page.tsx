import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";

import HackerApplicationForm from "@/components/applications/HackerApplicationForm";
import PageWrapper from "@/components/PageWrapper";

const HackerApplicationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/sign-up");
  }

  return (
    <PageWrapper>
      <HackerApplicationForm />
    </PageWrapper>
  );
};
export default HackerApplicationPage;

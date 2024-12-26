import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";

import PageWrapper from "@/components/PageWrapper";

const HackerApplicationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/sign-up");
  }

  return <PageWrapper>HackerApplicationPage</PageWrapper>;
};
export default HackerApplicationPage;

import { currentUser } from "@/auth";

import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { UnauthorizedState } from "@/components/dashboard/UnauthorizedState";

const Home = async () => {
  const user = await currentUser();

  if (!user) {
    return <UnauthorizedState />;
  }

  return <DashboardContent user={user} />;
};

export default Home;

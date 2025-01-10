import { Metadata } from "next";

import { EmptyPage } from "@/components/EmptyPage";

export const metadata: Metadata = {
  title: "Schedule",
};

const SchedulePage = () => {
  return (
    <EmptyPage
      title="Schedule Page"
      message="The schedule for the event is currently being finalized. Stay tuned for updates!"
    />
  );
};
export default SchedulePage;

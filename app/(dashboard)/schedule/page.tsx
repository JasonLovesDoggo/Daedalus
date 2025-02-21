import { Metadata } from "next";

import { schedule } from "@/config/schedule";
import PageWrapper from "@/components/PageWrapper";
import ScheduleGrid from "@/components/schedule/ScheduleGrid";
import ScheduleLegend from "@/components/schedule/ScheduleLegend";

export const metadata: Metadata = {
  title: "Schedule",
  description: "Event schedule for Hack Canada",
};

export default function SchedulePage() {
  return (
    <PageWrapper className="max-w-screen-2xl 3xl:max-w-screen-2xl">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-primary">Event Schedule</h1>
          <p className="text-textSecondary">
            All times are in Eastern Time (ET). Events and times are subject to
            change.
          </p>
        </div>

        <ScheduleLegend />
        <div className="rounded-lg border border-border bg-backgroundMuted p-4">
          <ScheduleGrid schedule={schedule} />
        </div>
      </div>
    </PageWrapper>
  );
}

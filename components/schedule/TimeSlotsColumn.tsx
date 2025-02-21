import { TIME_SLOT_HEIGHT } from "./utils/schedule-utils";

interface TimeSlotsColumnProps {
  timeSlots: string[];
}

export function TimeSlotsColumn({ timeSlots }: TimeSlotsColumnProps) {
  return (
    <div className="relative">
      {timeSlots.map((time) => (
        <div
          key={time}
          className="border-t border-border"
          style={{ height: TIME_SLOT_HEIGHT }}
        >
          {/* Time label positioned under the line */}
          <div className="sticky left-0 mt-2 pr-4 text-right text-sm text-textSecondary">
            {time}
          </div>
        </div>
      ))}
    </div>
  );
}

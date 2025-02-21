import { ScheduleItem } from "@/config/schedule";

export const DAYS = ["Friday", "Saturday", "Sunday"];
export const TIME_SLOT_HEIGHT = 60; // Height in pixels for each 15-min slot
export const INTERVAL = 15; // 15-minute intervals

// Time ranges for each day
export const DAY_RANGES = {
  friday: { start: 16, end: 24 }, // 4 PM to 12 AM
  saturday: { start: 0, end: 24 }, // 12 AM to 12 AM
  sunday: { start: 0, end: 20 }, // 12 AM to 8 PM
} as const;

export function generateTimeSlots(selectedDay: number) {
  const slots = [];
  const range =
    selectedDay === 0
      ? DAY_RANGES.friday
      : selectedDay === 1
        ? DAY_RANGES.saturday
        : DAY_RANGES.sunday;

  for (let hour = range.start; hour < range.end; hour++) {
    for (let minute = 0; minute < 60; minute += INTERVAL) {
      // Format hour in 12-hour format with AM/PM
      const hour12 = hour % 12 || 12;
      const period = hour < 12 ? "AM" : "PM";
      slots.push(`${hour12}:${minute.toString().padStart(2, "0")} ${period}`);
    }
  }
  return slots;
}

export interface EventPosition {
  event: ScheduleItem;
  column: number;
  totalColumns: number;
}

export function calculateEventPositions(
  events: ScheduleItem[],
): EventPosition[] {
  const positions: EventPosition[] = [];
  // Sort events by start time
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
  );

  // Function to check if events overlap
  const doEventsOverlap = (event1: ScheduleItem, event2: ScheduleItem) => {
    const start1 = new Date(event1.startTime).getTime();
    const end1 = new Date(event1.endTime).getTime();
    const start2 = new Date(event2.startTime).getTime();
    const end2 = new Date(event2.endTime).getTime();
    return !(end1 <= start2 || start1 >= end2);
  };

  // Group overlapping events together
  const overlapGroups: ScheduleItem[][] = [];

  sortedEvents.forEach((event) => {
    // Try to add to existing group
    let addedToGroup = false;

    for (const group of overlapGroups) {
      // Check if event overlaps with any event in the group
      if (group.some((groupEvent) => doEventsOverlap(event, groupEvent))) {
        group.push(event);
        addedToGroup = true;
        break;
      }
    }

    // If doesn't overlap with any existing group, create new group
    if (!addedToGroup) {
      overlapGroups.push([event]);
    }
  });

  // Process each group to assign columns
  overlapGroups.forEach((group) => {
    const eventsInGroup = group.length;
    group.forEach((event, index) => {
      positions.push({
        event,
        column: index,
        totalColumns: eventsInGroup,
      });
    });
  });

  return positions;
}

export function getEventStyle(
  event: ScheduleItem,
  position: EventPosition,
  selectedDay: number,
) {
  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);

  // Calculate start and end positions
  const startHour = startDate.getHours();
  const startMinute = startDate.getMinutes();
  const endHour = endDate.getHours();
  const endMinute = endDate.getMinutes();

  // Get the day's start hour
  const dayStartHour =
    selectedDay === 0
      ? DAY_RANGES.friday.start
      : selectedDay === 1
        ? DAY_RANGES.saturday.start
        : DAY_RANGES.sunday.start;

  // Adjust for day's start time
  const startSlots =
    (startHour - dayStartHour) * 4 + Math.floor(startMinute / 15);
  // Handle midnight (00:00) correctly by converting it to 24:00
  const adjustedEndHour = endHour === 0 ? 24 : endHour;
  const endSlots =
    (adjustedEndHour - dayStartHour) * 4 + Math.floor(endMinute / 15);
  const duration = endSlots - startSlots;

  // Calculate width based on number of overlapping events
  const columnWidth = 100 / Math.max(1, position.totalColumns);
  const width = `${columnWidth}%`;
  const left = `${position.column * columnWidth}%`;

  return {
    top: `${startSlots * TIME_SLOT_HEIGHT}px`,
    height: `${duration * TIME_SLOT_HEIGHT}px`,
    position: "absolute" as const,
    left,
    width,
    zIndex: 10,
  };
}

export function getDayEvents(schedule: ScheduleItem[], selectedDay: number) {
  return schedule.filter((event) => {
    const eventDate = new Date(event.startTime);
    const day = eventDate.getDay(); // 5 = Friday, 6 = Saturday, 0 = Sunday
    return day === (selectedDay === 2 ? 0 : selectedDay + 5);
  });
}

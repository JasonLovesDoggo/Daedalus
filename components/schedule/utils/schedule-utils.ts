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
  const columnEvents: ScheduleItem[][] = [[], [], []]; // 3 columns

  // Sort events by start time
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
  );

  // Function to check if event overlaps with any event in a column
  const hasOverlap = (event: ScheduleItem, column: ScheduleItem[]) => {
    const eventStart = new Date(event.startTime).getTime();
    const eventEnd = new Date(event.endTime).getTime();

    return column.some((existingEvent) => {
      const existingStart = new Date(existingEvent.startTime).getTime();
      const existingEnd = new Date(existingEvent.endTime).getTime();
      return !(eventEnd <= existingStart || eventStart >= existingEnd);
    });
  };

  // Place each event in the appropriate column
  sortedEvents.forEach((event) => {
    let placed = false;

    // First, try to place in columns that have no overlap
    for (let i = 0; i < 3; i++) {
      if (!hasOverlap(event, columnEvents[i])) {
        columnEvents[i].push(event);
        positions.push({
          event,
          column: i,
          totalColumns: 3, // Always 3 columns
        });
        placed = true;
        break;
      }
    }

    // If there's overlap in all columns, find the one with the least events
    if (!placed) {
      const columnWithLeastEvents = columnEvents.reduce(
        (minCol, currCol, currIndex) =>
          currCol.length < columnEvents[minCol].length ? currIndex : minCol,
        0,
      );

      columnEvents[columnWithLeastEvents].push(event);
      positions.push({
        event,
        column: columnWithLeastEvents,
        totalColumns: 3, // Always 3 columns
      });
    }
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
  const endSlots = (endHour - dayStartHour) * 4 + Math.floor(endMinute / 15);
  const duration = endSlots - startSlots;

  // Fixed width for 3-column layout
  const width = "33.33%";
  const left = `${position.column * 33.33}%`;

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

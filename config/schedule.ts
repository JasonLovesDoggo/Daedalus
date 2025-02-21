export interface ScheduleItem {
  name: string;
  type: "general" | "meals" | "ceremonies" | "workshops" | "fun";
  location?: string;
  startTime: string; // ISO string format
  endTime: string; // ISO string format
}

export const schedule: ScheduleItem[] = [
  // Friday Events
  {
    name: "Registration & Check-in",
    type: "general",
    location: "Main Lobby",
    startTime: "2025-02-21T16:30:00-05:00",
    endTime: "2025-02-21T18:00:00-05:00",
  },
  {
    name: "Opening Ceremony",
    type: "ceremonies",
    location: "Main Hall",
    startTime: "2025-02-21T18:30:00-05:00",
    endTime: "2025-02-21T20:00:00-05:00",
  },
  {
    name: "Dinner",
    type: "meals",
    location: "Dining Area",
    startTime: "2025-02-21T20:00:00-05:00",
    endTime: "2025-02-21T21:00:00-05:00",
  },
  {
    name: "Team Building Activity",
    type: "fun",
    location: "Common Area",
    startTime: "2025-02-21T20:30:00-05:00",
    endTime: "2025-02-21T21:30:00-05:00",
  },

  // Saturday Events
  {
    name: "Breakfast",
    type: "meals",
    location: "Dining Area",
    startTime: "2025-02-22T08:00:00-05:00",
    endTime: "2025-02-22T09:00:00-05:00",
  },
  {
    name: "React Workshop",
    type: "workshops",
    location: "Workshop Room A",
    startTime: "2025-02-22T10:00:00-05:00",
    endTime: "2025-02-22T11:30:00-05:00",
  },
  {
    name: "Lunch",
    type: "meals",
    location: "Dining Area",
    startTime: "2025-02-22T12:00:00-05:00",
    endTime: "2025-02-22T13:00:00-05:00",
  },
  {
    name: "AI/ML Workshop",
    type: "workshops",
    location: "Workshop Room B",
    startTime: "2025-02-22T14:00:00-05:00",
    endTime: "2025-02-22T15:30:00-05:00",
  },
  {
    name: "Gaming Tournament",
    type: "fun",
    location: "Game Room",
    startTime: "2025-02-22T16:00:00-05:00",
    endTime: "2025-02-22T18:00:00-05:00",
  },
  {
    name: "Dinner",
    type: "meals",
    location: "Dining Area",
    startTime: "2025-02-22T18:30:00-05:00",
    endTime: "2025-02-22T19:30:00-05:00",
  },

  // Sunday Events
  {
    name: "Breakfast",
    type: "meals",
    location: "Dining Area",
    startTime: "2025-02-23T08:00:00-05:00",
    endTime: "2025-02-23T09:00:00-05:00",
  },
  {
    name: "Project Submission Deadline",
    type: "general",
    startTime: "2025-02-23T11:00:00-05:00",
    endTime: "2025-02-23T11:15:00-05:00",
  },
  {
    name: "Lunch",
    type: "meals",
    location: "Dining Area",
    startTime: "2025-02-23T12:00:00-05:00",
    endTime: "2025-02-23T13:00:00-05:00",
  },
  {
    name: "Project Expo",
    type: "general",
    location: "Main Hall",
    startTime: "2025-02-23T13:30:00-05:00",
    endTime: "2025-02-23T15:30:00-05:00",
  },
  {
    name: "Closing Ceremony",
    type: "ceremonies",
    location: "Main Hall",
    startTime: "2025-02-23T16:00:00-05:00",
    endTime: "2025-02-23T17:30:00-05:00",
  },
];

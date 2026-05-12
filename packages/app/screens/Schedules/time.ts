import { ScheduleTime, Day } from "~/graph";

export const toDate = (time: ScheduleTime): Date => {
  const d = new Date();
  d.setHours(time.hour, time.minute, 0, 0);

  let offset: number;
  switch (time.day) {
    case "SUN":
      offset = -d.getDay();
      break;
    case "MON":
      offset = 1 - d.getDay();
      break;
    case "TUE":
      offset = 2 - d.getDay();
      break;
    case "WED":
      offset = 3 - d.getDay();
      break;
    case "THU":
      offset = 4 - d.getDay();
      break;
    case "FRI":
      offset = 5 - d.getDay();
      break;
    case "SAT":
      offset = 6 - d.getDay();
      break;
  }

  d.setDate(d.getDate() + offset);

  return d;
};

export const days: Day[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

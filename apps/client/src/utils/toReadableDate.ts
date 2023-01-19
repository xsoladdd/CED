import { format } from "date-fns";

export const toReadableDate = (date: Date): string => {
  return format(date, "EEEE, MMMM do, y'");
};

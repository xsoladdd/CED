import { format } from "date-fns";

export const formatDate = (date: Date | string): string => {
  const dateFormat = "MM/dd/yyyy";

  if (typeof date === "string") {
    const conv = new Date(date);
    return format(conv, dateFormat);
  } else {
    return format(date, dateFormat);
  }
};

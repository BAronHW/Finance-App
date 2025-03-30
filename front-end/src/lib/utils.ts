import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import { DateRange } from "react-day-picker";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// **** Above is the default utility function for shadcn **** //

export class CustomError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }
}

export const createCustomError = (code: string, message: string) => {
  const error = new CustomError(message, code);
  return error;
};

export const isInDateRange = (dateRange: DateRange, timestamp: number) => {
  const time = timestamp * 1000;
  if (dateRange.from && dateRange.to) {
    return time >= dayjs(dateRange.from).valueOf() && time <= dayjs(dateRange.to).valueOf();
  } else if (dateRange.from) {
    return time >= dayjs(dateRange.from).valueOf();
  } else if (dateRange.to) {
    return time <= dayjs(dateRange.to).valueOf();
  } else {
    return true;
  }
}
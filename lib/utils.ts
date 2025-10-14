import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dataString: string) {
  return new Date(dataString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatViewCount(views: number) {
  if (views > 1) {
    return "views";
  } else {
    return "view";
  }
}

export function parseServerActionResponse<T>(res: T) {
  return JSON.parse(JSON.stringify(res));
}

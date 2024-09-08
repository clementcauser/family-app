import { clsx, type ClassValue } from "clsx";
import { createSafeActionClient } from "next-safe-action";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const safeActionClient = createSafeActionClient();

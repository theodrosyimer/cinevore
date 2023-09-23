import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { env } from "@/env.mjs"
import { TableStatus } from "@/types/db"
import { db } from "@/lib/db"
import { sql } from "drizzle-orm"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}

export function convertMinutesToHoursAndMinutes(minutes: number) {
  // if (typeof minutes !== 'number') {
  //   throw new Error('The movie duration time must be a number')
  // }

  // if (minutes <= 0) {
  //   throw new Error('The movie duration time must be a positive number greater than 0')
  // }

  function format(cb: (() => number)) {
    return cb() < 10 ? `0${cb()}` : cb()
  }
  return `${format(() => Math.trunc(minutes / 60))}h${format(() => minutes % 60)}`
}

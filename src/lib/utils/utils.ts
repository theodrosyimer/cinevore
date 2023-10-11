import { toast } from '@/components/ui/use-toast'
import { KeysOf } from '@/types/utility'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// TODO: add supported languages types for `lang` param
export function formatDate(input: string | number, lang = 'en-US'): string {
  const date = new Date(input)
  return date.toLocaleDateString(lang, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function baseUrl() {
  if (typeof window !== 'undefined') {
    if (process.env.NODE_ENV === 'production') {
      return process.env.NEXT_PUBLIC_APP_URL
    }
  }
  return `http://localhost:${process.env.PORT || 3000}`
}

export function absoluteUrl(path: string) {
  return `${baseUrl()}${path} `
}

export function convertMinutesToHoursAndMinutes(minutes: number) {
  function format(cb: () => number) {
    return cb() < 10 ? `0${cb()} ` : cb()
  }
  return `${format(() => Math.trunc(minutes / 60))}h${format(
    () => minutes % 60
  )
    } `
}

/**
 * ```ts
  * // output format:
 * [error.name]: error.message
  * ```
 */
export function formatSimpleErrorMessage(error: Error) {
  return `[${error.name.toLocaleUpperCase()}]: ${error.message} `
}

export function randomMinMax(min = 0, max = 0) {
  return Math.max(Math.round(Math.random() * max), min)
}

export function firstHalveIndex(arr: any[]) {
  return [0, Math.ceil(arr.length / 2)]
}

export function secondHalveIndex(arr: any[]) {
  return [Math.ceil(arr.length / 2), arr.length]
}
export function firstHalve(arr: any[]) {
  return arr.slice(0, Math.ceil(arr.length / 2))
}

export function secondHalve(arr: any[]) {
  return arr.slice(Math.ceil(arr.length / 2), arr.length)
}

export function randomFromArrayFirstHalve(arr: any[]) {
  return arr[randomMinMax(0, Math.ceil(arr.length / 2))]
}

export function randomFromArraySecondHalve(arr: any[]) {
  return arr[randomMinMax(Math.ceil(arr.length / 2), arr.length)]
}

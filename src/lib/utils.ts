import { toast } from "@/components/ui/use-toast"
import { KeysOf } from "@/types/utility"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function convertMinutesToHoursAndMinutes(minutes: number) {
  function format(cb: (() => number)) {
    return cb() < 10 ? `0${cb()}` : cb()
  }
  return `${format(() => Math.trunc(minutes / 60))}h${format(() => minutes % 60)}`
}

/**
 * ```ts
 * // output format:
 * [error.name]: error.message
 * ```
 */
export function formatSimpleErrorMessage(error: Error) {
  return `[${error.name.toLocaleUpperCase()}]: ${error.message}`
}

export const randomMinMax = (min = 0, max = 0) =>
  Math.max(Math.round(Math.random() * max), min)

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

const Log = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",
  // Foreground (text) colors
  fg: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    crimson: "\x1b[38m"
  },
  // Background colors
  bg: {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
    crimson: "\x1b[48m"
  }
} as const

type LogType = typeof Log
type LogTypeKeys = KeysOf<LogType>
type LogTypeFg = Extract<LogTypeKeys, 'fg'>
type LogTypeBg = Extract<LogTypeKeys, 'bg'>
type LogTypeFgKeys = KeysOf<typeof Log.fg>
type LogTypeBgKeys = KeysOf<typeof Log.bg>

type Color =
  | `${LogTypeFg}.${LogTypeFgKeys}`
  | `${LogTypeBg}.${LogTypeBgKeys}`

export const log = (text: unknown, color: Color = 'fg.black') => {
  const [fgOrBg, colorName] = color.split('.') as [LogTypeFg | LogTypeBg, LogTypeFgKeys | LogTypeBgKeys]

  if (!fgOrBg || !colorName || !Log[fgOrBg] || !Log[fgOrBg][colorName]) {
    throw new Error(`Invalid color: ${color}`)
  }
  console.log(`${Log[fgOrBg][colorName]}%s${Log.reset}`, text)
}

// usage:
// log('fg.red', "My text is red")
// log('bg.cyan', "My background is cyan")


/* eslint-disable no-unused-vars */
type TypeName<T> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends boolean
  ? 'boolean'
  : T extends undefined
  ? 'undefined'
  : T extends symbol
  ? 'symbol'
  : T extends bigint
  ? 'bigint'
  : T extends (...args: any) => unknown
  ? 'function'
  : T extends Array<unknown>
  ? 'array'
  : T extends null
  ? 'null'
  : T extends Date
  ? 'date'
  : object

export const getTypeName = <T>(value: T): TypeName<T> => {
  if (value === null) return 'null' as TypeName<T>
  if (value instanceof Function) return 'function' as TypeName<T>
  if (value instanceof Array) return 'array' as TypeName<T>
  if (value instanceof Date) return 'date' as TypeName<T>

  // It MUST be the last condition to check
  // because Function, Array, Date are also Object
  // so we need to filter out those before
  if (value instanceof Object) return 'object' as TypeName<T>

  return typeof value as TypeName<T>
}

const sanitizeString = (text: string) =>
  text
    .trim()
    .toLowerCase()
    .replace(/[^\s\w]|_/g, '')
    .split(' ')
    // .filter((x) => x)
    .join('-')

export const slugify = (text: string): { slug: string } | { error: Error } => {
  const _text = text
  const maxLength = 80

  if (typeof _text !== 'string' || _text == null) {
    return {
      error: new Error(`Expected a 'string', received '${getTypeName(_text)}'`),
    }
  }

  if (_text.length > maxLength) {
    return {
      error: new Error(
        `The text's length limit has been reached, please retry with less than ${maxLength} characters (received: ${_text.length}).`
      ),
    }
  }

  return { slug: sanitizeString(_text) }
}

export function handleSlug(title: string) {
  const result = slugify(title)
  if ('error' in result) {
    console.log(result.error)
    toast({
      title: result.error.name,
      description: result.error.message,
    })
    return
  }
  if (result) {
    return slugify(title) as { slug: string }
  }
}

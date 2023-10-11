import { KeysOf } from "@/types/utility"

const Log = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  // Foreground (text) colors
  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    crimson: '\x1b[38m',
  },
  // Background colors
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    crimson: '\x1b[48m',
  },
} as const

type LogType = typeof Log
type LogTypeKeys = KeysOf<LogType>
type LogTypeFg = Extract<LogTypeKeys, 'fg'>
type LogTypeBg = Extract<LogTypeKeys, 'bg'>
type LogTypeFgKeys = KeysOf<typeof Log.fg>
type LogTypeBgKeys = KeysOf<typeof Log.bg>

type Color = `${LogTypeFg}.${LogTypeFgKeys}` | `${LogTypeBg}.${LogTypeBgKeys}`

export const log = (text: unknown, color: Color = 'fg.black') => {
  const [fgOrBg, colorName] = color.split('.') as [
    LogTypeFg | LogTypeBg,
    LogTypeFgKeys | LogTypeBgKeys
  ]

  if (!fgOrBg || !colorName || !Log[fgOrBg] || !Log[fgOrBg][colorName]) {
    throw new Error(`Invalid color: ${color} `)
  }
  if (typeof text === 'object') {
    console.log(`${Log[fgOrBg][colorName]}%O${Log.reset}`, text)
    return
  }

  console.log(`${Log[fgOrBg][colorName]}%s${Log.reset}`, text)
}

// usage:
// log('fg.red', "My text is red")
// log('bg.cyan', "My background is cyan")

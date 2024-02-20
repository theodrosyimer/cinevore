import { toast } from '@/components/ui/use-toast'

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
  : T extends ((...args: unknown[]) => unknown) | (() => unknown)
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
    .replace(/(^.*)(-)$/g, '$1')

export function slugify(text: string | null | undefined) {
  const _text = text
  const maxLength = 100

  if (typeof _text !== 'string' || _text == null) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Expected a 'string', received '${getTypeName(_text)}'`)
  }

  if (_text.length > maxLength) {
    throw new Error(
      `The text's length limit has been reached, please retry with less than ${maxLength} characters (received: ${_text.length}).`,
    )
  }

  return sanitizeString(_text)
}

export function handleSlug(title: string) {
  try {
    return slugify(title)
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
      toast({
        title: error.name,
        description: error.message,
      })
      return
    }
  }
}

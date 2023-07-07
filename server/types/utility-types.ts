export type ValuesOf<TObject extends Record<string, unknown>> = {
  [K in keyof TObject]: TObject[K]
}[keyof TObject]

export type KeysOf<TObject extends Record<string, unknown>> = {
  [K in keyof TObject]: K
}[keyof TObject]

export type Inspect<T> = {
  [key in keyof T]: T[key]
}

export type ArrayValues<T> = {
  [key in keyof T]: T[key][number]
}

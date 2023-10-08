export type ValuesOf<TObject extends Record<string, unknown>> = {
  [K in keyof TObject]: TObject[K];
}[keyof TObject];

export type KeysOf<TObject extends Record<string, unknown>> = {
  [K in keyof TObject]: K;
}[keyof TObject];

export type Inspect<T> = {
  [key in keyof T]: T[key];
};

export type ArrayValues<T extends Record<any, Array<string>>> = {
  [key in keyof T]: T[key][number];
};

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export type DeepWriteable<T> = {
  -readonly [P in keyof T]: DeepWriteable<T[P]>;
};

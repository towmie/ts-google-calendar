export type UnionOmit<T, K extends string | symbol | number> = T extends unknown
  ? Omit<T, K>
  : never;

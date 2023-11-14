export const DayKinds = [
  "sun",
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat"
] as const;
export type DayKind = typeof DayKinds[number];

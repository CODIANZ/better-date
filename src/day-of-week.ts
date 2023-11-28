export const DayOfWeekMap = {
  0: "sun",
  1: "mon",
  2: "tue",
  3: "wed",
  4: "thu",
  5: "fri",
  6: "sat",
} as const;

export type DayOfWeekNumber = keyof typeof DayOfWeekMap;
export type DayOfWeek = (typeof DayOfWeekMap)[DayOfWeekNumber];
export const DayOfWeeks = [
  "sun",
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
] as const;

export function isValidDayOfWeekNumber(x: unknown): x is DayOfWeekNumber {
  return typeof x === "number" && x >= 0 && x <= 6;
}

export function isValidDayOfWeek(x: unknown): x is DayOfWeek {
  return typeof x === "string" && DayOfWeeks.includes(x as DayOfWeek);
}

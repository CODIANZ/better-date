import * as dk from "./day-of-week";

test("day of week", () => {
  expect(dk.DayOfWeeks.length).toBe(7);
  dk.DayOfWeeks.forEach((dayOfWeek) => {
    expect(dk.isValidDayOfWeek(dayOfWeek)).toBe(true);
    expect(dk.isValidDayOfWeekNumber(dk.DayOfWeeks.indexOf(dayOfWeek))).toBe(
      true
    );
  });
  expect(dk.isValidDayOfWeek("")).toBe(false);
  expect(dk.isValidDayOfWeek("monday")).toBe(false);
  expect(dk.isValidDayOfWeek("mon")).toBe(true);
  expect(dk.isValidDayOfWeekNumber(-1)).toBe(false);
  expect(dk.isValidDayOfWeekNumber(7)).toBe(false);
  expect(dk.isValidDayOfWeekNumber(0)).toBe(true);
});

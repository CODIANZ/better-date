import * as uo from "./utc-offset";

test("UTC offset", () => {
  expect(uo.isValidUTCOffsetMinutes(-720)).toBe(true);
  expect(uo.isValidUTCOffsetMinutes(0)).toBe(true);
  expect(uo.isValidUTCOffsetMinutes(720)).toBe(true);
  expect(uo.isValidUTCOffsetMinutes(721)).toBe(false);
  expect(uo.isValidUTCOffsetMinutes(-721)).toBe(false);

  expect(uo.isValidUTCOffset("-12:00")).toBe(true);
  expect(uo.isValidUTCOffset("+00:00")).toBe(true);
  expect(uo.isValidUTCOffset("+12:00")).toBe(true);
  expect(uo.isValidUTCOffset("+12:01")).toBe(false);
  expect(uo.isValidUTCOffset("-12:01")).toBe(false);

  expect(uo.utcOffsetMinutesToUTCOffset(-720)).toBe("-12:00");
  expect(uo.utcOffsetMinutesToUTCOffset(0)).toBe("+00:00");
  expect(uo.utcOffsetMinutesToUTCOffset(720)).toBe("+12:00");

  expect(uo.convertToUTCOffsetMinutes("+00:00")).toBe(0);
  expect(() => uo.convertToUTCOffsetMinutes("+00:01")).toThrow(
    "invalid UTC offset"
  );
  expect(uo.convertToUTCOffsetMinutes(-720)).toBe(-720);
  expect(() => uo.convertToUTCOffsetMinutes(-721)).toThrow(
    "invalid UTC offset"
  );
});

import { HHMM } from "./hhmm";

test("construct", () => {
  const hhmm1 = HHMM.from("12:34");
  expect(hhmm1.str).toBe("1234");
  const hhmm2 = HHMM.from("1:2");
  expect(hhmm2.str).toBe("0102");
  const hhmm3 = HHMM.from("12-34");
  expect(hhmm3.str).toBe("1234");
  const hhmm4 = HHMM.from(hhmm3);
  expect(hhmm4.str).toBe("1234");
  expect(() => HHMM.from("123")).toThrow();
  expect(() => HHMM.from("1299")).toThrow();
});

test("Properties", () => {
  const hhmm = HHMM.from("1234");
  expect(hhmm.valid).toBe(true);
  expect(hhmm.empty).toBe(false);
  expect(hhmm.h).toBe(12);
  expect(hhmm.m).toBe(34);
  expect(hhmm.hstr).toBe("12");
  expect(hhmm.mstr).toBe("34");
  expect(hhmm.mtotal).toBe(754);
  expect(hhmm.str).toBe("1234");
  expect(hhmm.strWithColon).toBe("12:34");
});

test("add minutes", () => {
  const hhmm = HHMM.from("0000");
  const hhmm0123 = hhmm.addMinutes(83);
  expect(hhmm0123.h).toBe(1);
  expect(hhmm0123.m).toBe(23);
});

test("stringify", () => {
  const hhmm = HHMM.from("1234");
  expect(hhmm.hstr).toBe("12");
  expect(hhmm.mstr).toBe("34");
  expect(hhmm.str).toBe("1234");
  expect(hhmm.strWithColon).toBe("12:34");
});

test("calcurations", () => {
  const hhmm = HHMM.from("1234");
  expect(hhmm.addMinutes(1).str).toBe("1235");
  expect(hhmm.addMinutes(-1).str).toBe("1233");
  expect(hhmm.addMinutes(60).str).toBe("1334");
  expect(hhmm.addMinutes(-60).str).toBe("1134");
  expect(hhmm.mzero().str).toBe("1200");
  expect(hhmm.floor(15).str).toBe("1230");
  expect(hhmm.ceil(15).str).toBe("1245");
});

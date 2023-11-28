import { HHMM } from "./hhmm";

test("HHMM", () => {
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
  expect(hhmm.mzero().str).toBe("1200");
  expect(hhmm.floor(15).str).toBe("1230");
  expect(hhmm.ceil(15).str).toBe("1245");
});

test("add minutes", () => {
  const hhmm = HHMM.from("0000");
  const hhmm0123 = hhmm.addMinutes(83);
  expect(hhmm0123.h).toBe(1);
  expect(hhmm0123.m).toBe(23);
});

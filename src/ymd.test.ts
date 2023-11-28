import * as YMD from "./ymd";

test("YMD", () => {
  const ymd: YMD.IYMD = { year: 2020, month: 1, day: 2 };
  expect(YMD.isValidYmd(ymd)).toBe(true);

  const ymd2: YMD.IYMD = { year: 2020, month: 1, day: 32 };
  expect(YMD.isValidYmd(ymd2)).toBe(false);
});

test("stringToYmd", () => {
  const ymd = YMD.stringToYmd("2020-01-02");
  expect(ymd.year).toBe(2020);
  expect(ymd.month).toBe(1);
  expect(ymd.day).toBe(2);
  expect(() => YMD.stringToYmd("2020-01-32")).toThrow();
});

test("ymdToString", () => {
  const ymd: YMD.IYMD = { year: 2020, month: 1, day: 2 };
  expect(YMD.ymdToString(ymd)).toBe("20200102");
});

test("isSameYmd", () => {
  const ymd: YMD.IYMD = { year: 2020, month: 1, day: 2 };
  const ymd2: YMD.IYMD = { year: 2020, month: 1, day: 2 };
  expect(YMD.isSameYmd(ymd, ymd2)).toBe(true);
  const ymd3: YMD.IYMD = { year: 2020, month: 1, day: 3 };
  expect(YMD.isSameYmd(ymd, ymd3)).toBe(false);
});

test("isYmdLike", () => {
  const ymd: YMD.IYMD = { year: 2020, month: 1, day: 2 };
  expect(YMD.isYmdLike(ymd)).toBe(true);
  expect(YMD.isYmdLike({ year: 2020, month: 1 })).toBe(false);
  expect(YMD.isYmdLike({ year: 2020, month: 1, day: 2, foo: "bar" })).toBe(
    true
  );
  expect(YMD.isYmdLike({ year: 2020, month: "1", day: 2 })).toBe(false);
});

test("getDayOfWeek", () => {
  const ymd: YMD.IYMD = { year: 2020, month: 1, day: 2 };
  expect(YMD.getDayOfWeek(ymd)).toBe("thu");
});

test("addDays", () => {
  const ymd20200102: YMD.IYMD = { year: 2020, month: 1, day: 2 };
  const ymd20200103 = YMD.addDays(ymd20200102, 1);
  expect(ymd20200103.year).toBe(2020);
  expect(ymd20200103.month).toBe(1);
  expect(ymd20200103.day).toBe(3);
  const ymd20191231 = YMD.addDays(ymd20200102, -2);
  expect(ymd20191231.year).toBe(2019);
  expect(ymd20191231.month).toBe(12);
  expect(ymd20191231.day).toBe(31);
});

test("addMonths", () => {
  const ymd20200102: YMD.IYMD = { year: 2020, month: 1, day: 2 };
  const ymd20200202 = YMD.addMonths(ymd20200102, 1);
  expect(ymd20200202.year).toBe(2020);
  expect(ymd20200202.month).toBe(2);
  expect(ymd20200202.day).toBe(2);
  const ymd20191102 = YMD.addMonths(ymd20200102, -2);
  expect(ymd20191102.year).toBe(2019);
  expect(ymd20191102.month).toBe(11);
  expect(ymd20191102.day).toBe(2);
});

test("diffYmdDays", () => {
  const ymd20200102: YMD.IYMD = { year: 2020, month: 1, day: 2 };
  const ymd20200103: YMD.IYMD = { year: 2020, month: 1, day: 3 };
  expect(YMD.diffYmdDays(ymd20200102, ymd20200103)).toBe(-1);
  expect(YMD.diffYmdDays(ymd20200103, ymd20200102)).toBe(1);
});

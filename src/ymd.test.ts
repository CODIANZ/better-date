import * as YMD from "./ymd";

test("YMD", () => {
  const ymd: YMD.IYMD = {year: 2020, month: 1, day: 2};
  expect(YMD.isValidYmd(ymd)).toBe(true);



});

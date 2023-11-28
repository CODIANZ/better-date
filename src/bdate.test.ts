import { BDate } from "./bdate";

const jsdate = new Date();

test("Constructor - UTC date time values", () => {
  const date = BDate.fromUTCDateTimeValues(2020, 1, 2, 3, 4, 5, 678);
  expect(date.year).toBe(2020);
  expect(date.month).toBe(1);
  expect(date.day).toBe(2);
  expect(date.hour).toBe(3);
  expect(date.min).toBe(4);
  expect(date.sec).toBe(5);
  expect(date.msec).toBe(678);
  expect(date.utcOffsetMinutes).toBe(0);
  expect(date.toISOString()).toBe("2020-01-02T03:04:05.678Z");
  expect(date.toISOStringWithOffset()).toBe("2020-01-02T03:04:05.678+00:00");
});

test("Constructor - Javascript Date", () => {
  const date = BDate.from(jsdate);
  expect(date.year).toBe(jsdate.getFullYear());
  expect(date.month).toBe(jsdate.getMonth() + 1);
  expect(date.day).toBe(jsdate.getDate());
  expect(date.hour).toBe(jsdate.getHours());
  expect(date.min).toBe(jsdate.getMinutes());
  expect(date.sec).toBe(jsdate.getSeconds());
  expect(date.msec).toBe(jsdate.getMilliseconds());
  expect(date.utcOffsetMinutes).toBe(-jsdate.getTimezoneOffset());
  expect(date.toISOString()).toBe(jsdate.toISOString());
});

test(`Constructor - local string ${jsdate.toString()}`, () => {
  const str = jsdate.toString();
  const date = BDate.from(str);
  expect(date.year).toBe(jsdate.getFullYear());
  expect(date.month).toBe(jsdate.getMonth() + 1);
  expect(date.day).toBe(jsdate.getDate());
  expect(date.hour).toBe(jsdate.getHours());
  expect(date.min).toBe(jsdate.getMinutes());
  expect(date.sec).toBe(jsdate.getSeconds());
  expect(date.msec).toBe(0);
  expect(date.utcOffsetMinutes).toBe(-jsdate.getTimezoneOffset());
  /** compare without milliseconds */
  expect(date.toISOString().substring(0, 20)).toBe(
    jsdate.toISOString().substring(0, 20)
  );
});

test(`Constructor - BDate`, () => {
  const org = BDate.now();
  const date = BDate.from(org);
  expect(date.year).toBe(org.year);
  expect(date.month).toBe(org.month);
  expect(date.day).toBe(org.day);
  expect(date.hour).toBe(org.hour);
  expect(date.min).toBe(org.min);
  expect(date.sec).toBe(org.sec);
  expect(date.msec).toBe(org.msec);
  expect(date.utcOffsetMinutes).toBe(org.utcOffsetMinutes);
  date.year++;
  expect(date.year).not.toBe(org.year);
});

test(`Constructor - utc iso string ${jsdate.toISOString()}"`, () => {
  const str = jsdate.toISOString();
  const date = BDate.from(str);
  expect(date.year).toBe(jsdate.getFullYear());
  expect(date.month).toBe(jsdate.getMonth() + 1);
  expect(date.day).toBe(jsdate.getDate());
  expect(date.hour).toBe(jsdate.getHours());
  expect(date.min).toBe(jsdate.getMinutes());
  expect(date.sec).toBe(jsdate.getSeconds());
  expect(date.msec).toBe(jsdate.getMilliseconds());
  expect(date.utcOffsetMinutes).toBe(-jsdate.getTimezoneOffset());
  expect(date.toISOString()).toBe(jsdate.toISOString());
});

test(`Constructor - values with offset "+09:00"`, () => {
  const date = BDate.fromLocalDateTimeValues(
    "+09:00",
    2020,
    1,
    2,
    3,
    4,
    5,
    678
  );
  expect(date.year).toBe(2020);
  expect(date.month).toBe(1);
  expect(date.day).toBe(2);
  expect(date.hour).toBe(3);
  expect(date.min).toBe(4);
  expect(date.sec).toBe(5);
  expect(date.msec).toBe(678);
  expect(date.utcOffsetMinutes).toBe(9 * 60);
  expect(date.toISOString()).toBe("2020-01-01T18:04:05.678Z");
  expect(date.toISOStringWithOffset()).toBe("2020-01-02T03:04:05.678+09:00");
});

test(`Constructor - values with offset 540 min.`, () => {
  const date = BDate.fromLocalDateTimeValues(540, 2020, 1, 2, 3, 4, 5, 678);
  expect(date.year).toBe(2020);
  expect(date.month).toBe(1);
  expect(date.day).toBe(2);
  expect(date.hour).toBe(3);
  expect(date.min).toBe(4);
  expect(date.sec).toBe(5);
  expect(date.msec).toBe(678);
  expect(date.utcOffsetMinutes).toBe(9 * 60);
  expect(date.toISOString()).toBe("2020-01-01T18:04:05.678Z");
  expect(date.toISOStringWithOffset()).toBe("2020-01-02T03:04:05.678+09:00");
});

test("UTC conversion", () => {
  const date = BDate.from(jsdate).toUTC();
  expect(date.year).toBe(jsdate.getUTCFullYear());
  expect(date.month).toBe(jsdate.getUTCMonth() + 1);
  expect(date.day).toBe(jsdate.getUTCDate());
  expect(date.hour).toBe(jsdate.getUTCHours());
  expect(date.min).toBe(jsdate.getUTCMinutes());
  expect(date.sec).toBe(jsdate.getUTCSeconds());
  expect(date.msec).toBe(jsdate.getUTCMilliseconds());
  expect(date.utcOffsetMinutes).toBe(0);
  expect(date.toISOString()).toBe(jsdate.toISOString());
  expect(date.isUTC()).toBe(true);
});

test("New UTC offset", () => {
  const date = BDate.fromLocalDateTimeValues(
    "+09:00",
    2020,
    1,
    2,
    3,
    4,
    5,
    678
  );
  const date2 = date.newUTCOffset("+08:00");
  expect(date2.year).toBe(2020);
  expect(date2.month).toBe(1);
  expect(date2.day).toBe(2);
  expect(date2.hour).toBe(2);
  expect(date2.min).toBe(4);
  expect(date2.sec).toBe(5);
  expect(date2.msec).toBe(678);
  expect(date2.utcOffsetMinutes).toBe(8 * 60);
  expect(date2.toISOString()).toBe(date.toISOString());

  const date3 = date.newUTCOffset("-09:00");
  expect(date3.year).toBe(2020);
  expect(date3.month).toBe(1);
  expect(date3.day).toBe(1);
  expect(date3.hour).toBe(9);
  expect(date3.min).toBe(4);
  expect(date3.sec).toBe(5);
  expect(date3.msec).toBe(678);
  expect(date3.utcOffsetMinutes).toBe(-9 * 60);
  expect(date3.toISOString()).toBe(date.toISOString());
});

test("Date calculation", () => {
  const date = BDate.fromLocalDateTimeValues(
    "+09:00",
    2020,
    1,
    2,
    3,
    4,
    5,
    678
  );
  expect(date.addYears(1).toISOStringWithOffset()).toBe(
    "2021-01-02T03:04:05.678+09:00"
  );
  expect(date.addMonths(1).toISOStringWithOffset()).toBe(
    "2020-02-02T03:04:05.678+09:00"
  );
  expect(date.addDays(1).toISOStringWithOffset()).toBe(
    "2020-01-03T03:04:05.678+09:00"
  );
  expect(date.addHours(1).toISOStringWithOffset()).toBe(
    "2020-01-02T04:04:05.678+09:00"
  );
  expect(date.addMinutes(1).toISOStringWithOffset()).toBe(
    "2020-01-02T03:05:05.678+09:00"
  );
  expect(date.addSeconds(1).toISOStringWithOffset()).toBe(
    "2020-01-02T03:04:06.678+09:00"
  );
  expect(date.addMilliseconds(1).toISOStringWithOffset()).toBe(
    "2020-01-02T03:04:05.679+09:00"
  );
});

test("Date begin of, end of", () => {
  const date = BDate.fromLocalDateTimeValues(
    "+09:00",
    2020,
    1,
    2,
    3,
    4,
    5,
    678
  );
  expect(date.beginOfYear().toISOStringWithOffset()).toBe(
    "2020-01-01T00:00:00.000+09:00"
  );
  expect(date.endOfYear().toISOStringWithOffset()).toBe(
    "2020-12-31T23:59:59.999+09:00"
  );
  expect(date.beginOfMonth().toISOStringWithOffset()).toBe(
    "2020-01-01T00:00:00.000+09:00"
  );
  expect(date.endOfMonth().toISOStringWithOffset()).toBe(
    "2020-01-31T23:59:59.999+09:00"
  );
  expect(date.beginOfDay().toISOStringWithOffset()).toBe(
    "2020-01-02T00:00:00.000+09:00"
  );
  expect(date.endOfDay().toISOStringWithOffset()).toBe(
    "2020-01-02T23:59:59.999+09:00"
  );
  expect(date.beginOfWeek().toISOStringWithOffset()).toBe(
    "2019-12-29T00:00:00.000+09:00"
  );
  expect(date.endOfWeek().toISOStringWithOffset()).toBe(
    "2020-01-04T23:59:59.999+09:00"
  );
});

test("to HHMM", () => {
  const date = BDate.fromLocalDateTimeValues(
    "+09:00",
    2020,
    1,
    2,
    3,
    4,
    5,
    678
  );
  expect(date.toHHMM().str).toBe("0304");
});

test("to YMD", () => {
  const date = BDate.fromLocalDateTimeValues(
    "+09:00",
    2020,
    1,
    2,
    3,
    4,
    5,
    678
  );
  const ymd = date.toYMD();
  expect(ymd.year).toBe(2020);
  expect(ymd.month).toBe(1);
  expect(ymd.day).toBe(2);
});

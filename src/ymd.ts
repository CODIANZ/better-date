import { BDate } from "./bdate";
import { DayOfWeeks, DayOfWeek } from "./day-of-week";

export interface IYMD {
  year: number;
  month: number;
  day: number;
}

export function isSameYmd(a: IYMD | undefined, b: IYMD | undefined) {
  return (
    a !== undefined &&
    b !== undefined &&
    a.year === b.year &&
    a.month === b.month &&
    a.day === b.day
  );
}

export function ymdToString(ymd: IYMD) {
  return `${ymd.year.toString()}${("00" + ymd.month.toString()).slice(-2)}${(
    "00" + ymd.day.toString()
  ).slice(-2)}`;
}

export function isValidYmd(ymd: IYMD) {
  const d = BDate.fromUTCDateTimeValues(ymd.year, ymd.month, ymd.day);
  return d.year === ymd.year && d.month === ymd.month && d.day === ymd.day;
}

export function stringToYmd(s: string): IYMD | undefined {
  {
    const m = s.match(/^([\d]{4})[-/]?([\d]{2})[-/]?([\d]{2}).*/);
    if (m) {
      return {
        year: parseInt(m[1]),
        month: parseInt(m[2]),
        day: parseInt(m[3]),
      };
    }
  }
  {
    const m = s.match(/^([\d]{4})[-/]([\d]{1,2})[-/]([\d]{1,2}).*/);
    if (m) {
      return {
        year: parseInt(m[1]),
        month: parseInt(m[2]),
        day: parseInt(m[3]),
      };
    }
  }
}

export function isYmdLike(s: unknown): s is IYMD {
  if (typeof s === "object") {
    if (s === null) return false;
    if ("year" in s) {
      if (typeof s.year !== "number") return false;
    }
    if ("month" in s) {
      if (typeof s.month !== "number") return false;
    }
    if ("day" in s) {
      if (typeof s.day !== "number") return false;
    }
    return true;
  }
  return false;
}

export function getDayOfWeek(ymd: IYMD): DayOfWeek {
  const d = BDate.fromUTCDateTimeValues(ymd.year, ymd.month, ymd.day);
  return DayOfWeeks[d.dayOfWeek];
}

export function addDay(ymd: IYMD, days: number) {
  return BDate.fromUTCDateTimeValues(ymd.year, ymd.month, ymd.day)
    .addDays(days)
    .toYMD();
}

export function addMonth(ymd: IYMD, months: number) {
  return BDate.fromUTCDateTimeValues(ymd.year, ymd.month, ymd.day)
    .addMonths(months)
    .toYMD();
}

export function diffYmd(a: IYMD, b: IYMD) {
  return (
    (BDate.fromUTCDateTimeValues(a.year, a.month, a.day).msecSinceEpoch -
      BDate.fromUTCDateTimeValues(b.year, b.month, b.day).msecSinceEpoch) /
    86400000
  );
}

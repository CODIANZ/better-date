import { DayKinds, DayKind } from "./day-kind";

export interface IYMD {
  year: number;
  month: number;
  day: number;
}

export function ymdToDate(ymd: IYMD) {
  return new Date(ymd.year, ymd.month - 1, ymd.day);
}

export function dateToYmd(dt: string | Date) {
  const d = new Date(dt);
  return {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    day: d.getDate(),
  };
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
  return (
    ymd.year > 0 &&
    ymd.month >= 1 &&
    ymd.month <= 12 &&
    ymd.day >= 1 &&
    ymd.day <= 31
  );
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
  if(typeof s === "object"){
    if(s === null) return false;
    if("year" in s){
      if(typeof s.year !== "number") return false;
    }
    if("month" in s){
      if(typeof s.month !== "number") return false;
    }
    if("day" in s){
      if(typeof s.day !== "number") return false;
    }
    return true;
  }
  return false;
}

export function getDayKind(ymd: IYMD): DayKind {
  const d = new Date(ymd.year, ymd.month - 1, ymd.day);
  return DayKinds[d.getDay()];
}

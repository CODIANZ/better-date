import { DayOfWeekNumber, isValidDayOfWeekNumber } from "./day-of-week";
import { HHMM } from "./hhmm";
import {
  UTCOffsetMinutes,
  convertToUTCOffsetMinutes,
  isValidUTCOffsetMinutes,
  utcOffsetMinutesToUTCOffset,
} from "./utc-offset";
import { IYMD } from "./ymd";

class DateTimeCore {
  private m_rawDate: Date;

  protected constructor(
    year: number,
    month: number,
    day: number,
    hour: number = 0,
    minute: number = 0,
    second: number = 0,
    ms: number = 0
  ) {
    this.m_rawDate = new Date(
      Date.UTC(year, month - 1, day, hour, minute, second, ms)
    );
  }

  public static fromValues(
    year: number,
    month: number,
    day: number,
    hour: number = 0,
    minute: number = 0,
    second: number = 0,
    ms: number = 0
  ) {
    return new DateTimeCore(year, month, day, hour, minute, second, ms);
  }

  public get msec(): number {
    return this.m_rawDate.getUTCMilliseconds();
  }
  public set msec(n: number) {
    this.m_rawDate.setUTCMilliseconds(n);
  }
  public get sec(): number {
    return this.m_rawDate.getUTCSeconds();
  }
  public set sec(n: number) {
    this.m_rawDate.setUTCSeconds(n);
  }
  public get min(): number {
    return this.m_rawDate.getUTCMinutes();
  }
  public set min(n: number) {
    this.m_rawDate.setUTCMinutes(n);
  }
  public get hour(): number {
    return this.m_rawDate.getUTCHours();
  }
  public set hour(n: number) {
    this.m_rawDate.setUTCHours(n);
  }
  public get dayOfWeek(): DayOfWeekNumber {
    const day = this.m_rawDate.getUTCDay();
    if (!isValidDayOfWeekNumber(day))
      throw new Error("Invalid day kind number.");
    return day;
  }
  public get day(): number {
    return this.m_rawDate.getUTCDate();
  }
  public set day(n: number) {
    this.m_rawDate.setUTCDate(n);
  }
  public get month(): number {
    return this.m_rawDate.getUTCMonth() + 1;
  }
  public set month(n: number) {
    this.m_rawDate.setUTCMonth(n - 1);
  }
  public get year(): number {
    return this.m_rawDate.getUTCFullYear();
  }
  public set year(n: number) {
    this.m_rawDate.setUTCFullYear(n);
  }
  public get msecSinceEpoch(): number {
    return this.m_rawDate.getTime();
  }

  private fragments = {
    YYYY: () => ("0000" + this.year.toString()).slice(-4),
    MM: () => ("00" + this.month.toString()).slice(-2),
    DD: () => ("00" + this.day.toString()).slice(-2),
    hh: () => ("00" + this.hour.toString()).slice(-2),
    mm: () => ("00" + this.min.toString()).slice(-2),
    ss: () => ("00" + this.sec.toString()).slice(-2),
    ms: () => ("000" + this.msec.toString()).slice(-3),
    YY: () => this.year.toString().slice(-2),
    M: () => this.month.toString(),
    D: () => this.day.toString(),
    h: () => this.hour.toString(),
    m: () => this.min.toString(),
    s: () => this.sec.toString(),
  };

  /**
   * Format date-time string.
   * @param fmt A string that specifies formatting.
   *
   * * %%    : char of '%'
   * * %YYYY : 4-digit year
   * * %YY   : 2-digit year
   * * %MM   : 2-digit month
   * * %DD   : 2-digit day
   * * %hh   : 2-digit hours
   * * %mm   : 2-digit minutes
   * * %ss   : 2-digit seconds
   * * %ms   : 3-digit milliseconds
   * * %m    : month
   * * %d    : day
   * * %h    : hours
   * * %m    : minutes
   * * %s    : seconds
   */
  public format(fmt: string) {
    return fmt.replace(
      /%(%|YYYY|YY|MM|M|DD|D|hh|h|mm|ms|ss|m|s)/g,
      (match, p) => {
        switch (p) {
          case "%":
            return "%";
          case "YYYY":
            return this.fragments.YYYY();
          case "YY":
            return this.fragments.YY();
          case "MM":
            return this.fragments.MM();
          case "M":
            return this.fragments.M();
          case "DD":
            return this.fragments.DD();
          case "D":
            return this.fragments.D();
          case "hh":
            return this.fragments.hh();
          case "h":
            return this.fragments.h();
          case "mm":
            return this.fragments.mm();
          case "m":
            return this.fragments.m();
          case "ss":
            return this.fragments.ss();
          case "s":
            return this.fragments.s();
          case "ms":
            return this.fragments.ms();
        }
        return match;
      }
    );
  }

  public toString() {
    return this.format("%YYYY/%MM/%DD %hh:%mm:%ss");
  }

  /**
   * Get the difference in milliseconds.
   * @param other
   * @returns milliseconds
   */
  public diff(other: DateTimeCore) {
    return this.m_rawDate.getTime() - other.m_rawDate.getTime();
  }
}

type AnyUTCOffset = UTCOffsetMinutes | UTCOffsetMinutes | string | number;

export class BDate extends DateTimeCore {
  private m_utcOffsetMinutes: UTCOffsetMinutes;

  public static isBDate(o: unknown): o is BDate {
    return o instanceof BDate;
  }

  public clone(): BDate {
    return new BDate(
      this.m_utcOffsetMinutes,
      this.year,
      this.month,
      this.day,
      this.hour,
      this.min,
      this.sec,
      this.msec
    );
  }

  private constructor(
    utcOffset: AnyUTCOffset,
    year: number,
    month: number,
    day: number,
    hour: number = 0,
    minute: number = 0,
    second: number = 0,
    ms: number = 0
  ) {
    super(year, month, day, hour, minute, second, ms);
    this.m_utcOffsetMinutes = convertToUTCOffsetMinutes(utcOffset);
  }

  public static now(): BDate {
    return BDate.fromJsDate(new Date());
  }

  public static from(anyValue: string | Date | BDate) {
    if (BDate.isBDate(anyValue)) {
      return anyValue.clone();
    } else if (typeof anyValue === "string") {
      const jsdate = new Date(anyValue);
      return BDate.fromJsDate(jsdate);
    } else {
      return BDate.fromJsDate(anyValue);
    }
  }

  /**
   * Initialize it with a Javascript Date object. Use `getTimeZoneOffset()` for UTC offset.
   * @param jsDate Javascript Date object
   * @returns BDate
   */
  public static fromJsDate(jsDate: Date): BDate {
    const offset = -jsDate.getTimezoneOffset();
    if (!isValidUTCOffsetMinutes(offset)) {
      throw new Error("Invalid UTC offset.");
    }

    return new BDate(
      offset,
      jsDate.getFullYear(),
      jsDate.getMonth() + 1,
      jsDate.getDate(),
      jsDate.getHours(),
      jsDate.getMinutes(),
      jsDate.getSeconds(),
      jsDate.getMilliseconds()
    );
  }

  /**
   * Initialize BDate as UTC in a Javascript Date object.
   * @param jsDate Javascript Date object
   * @returns BDate (UTC)
   */
  public static fromJsDateAsUTC(jsDate: Date): BDate {
    return new BDate(
      0,
      jsDate.getUTCFullYear(),
      jsDate.getUTCMonth(),
      jsDate.getUTCDate(),
      jsDate.getUTCHours(),
      jsDate.getUTCMinutes(),
      jsDate.getUTCSeconds(),
      jsDate.getUTCMilliseconds()
    );
  }

  /**
   * Initialize a Javascript Date object with an arbitrary UTC offset.
   * @param jsDate Javascript Date object
   * @param utcOffset UTC offset string or minutes ("+09:00", "-02:00", 540, -120, ...)
   * @returns BDate
   */
  public static fromJsDateWithOffset(jsDate: Date, utcOffset: AnyUTCOffset) {
    return BDate.fromJsDateAsUTC(jsDate).newUTCOffset(
      convertToUTCOffsetMinutes(utcOffset)
    );
  }

  /**
   * Initialize with UTC offset and local year, month, day, hour, minute, and second.
   * @param utcOffset UTC offset string or minutes ("+09:00", "-02:00", 540, -120, ...)
   * @param year
   * @param month
   * @param day
   * @param hours
   * @param minutes
   * @param seconds
   * @param ms
   * @returns
   */
  public static fromLocalDateTimeValues(
    utcOffset: AnyUTCOffset,
    year: number,
    month: number,
    day: number,
    hour: number = 0,
    minute: number = 0,
    second: number = 0,
    ms: number = 0
  ) {
    return new BDate(utcOffset, year, month, day, hour, minute, second, ms);
  }

  /**
   * Initialize with UTC year, month, day, hour, minute, and second.
   * @param year
   * @param month
   * @param day
   * @param hours
   * @param minutes
   * @param seconds
   * @param ms
   * @returns BDate (UTC)
   */
  public static fromUTCDateTimeValues(
    year: number,
    month: number,
    day: number,
    hour: number = 0,
    minute: number = 0,
    second: number = 0,
    ms: number = 0
  ) {
    return new BDate(0, year, month, day, hour, minute, second, ms);
  }

  public toUTC(): BDate {
    const localDate = this.clone();
    localDate.min -= this.m_utcOffsetMinutes;
    localDate.m_utcOffsetMinutes = 0;
    return localDate;
  }

  public toISOString(): string {
    return this.toUTC().format("%YYYY-%MM-%DDT%hh:%mm:%ss.%msZ");
  }

  public toISOStringWithOffset(): string {
    return (
      this.format("%YYYY-%MM-%DDT%hh:%mm:%ss.%ms") +
      utcOffsetMinutesToUTCOffset(this.m_utcOffsetMinutes)
    );
  }

  public isUTC(): boolean {
    return this.m_utcOffsetMinutes === 0;
  }

  public get utcOffsetMinutes(): UTCOffsetMinutes {
    return this.m_utcOffsetMinutes;
  }

  /**
   * Generate a LocalTime with a new UTC offset.
   * @param utcOffset UTC offset string or minutes ("+09:00", "-02:00", 540, -120, ...)
   * @returns BDate
   */
  public newUTCOffset(utcOffset: AnyUTCOffset): BDate {
    const utcOffsetMinutes = convertToUTCOffsetMinutes(utcOffset);
    const localDate = this.clone();
    localDate.min += utcOffsetMinutes - this.m_utcOffsetMinutes;
    localDate.m_utcOffsetMinutes = utcOffsetMinutes;
    return localDate;
  }

  public toJsDate(): Date {
    const utc = this.toUTC();
    return new Date(
      Date.UTC(
        utc.year,
        utc.month,
        utc.day,
        utc.hour,
        utc.min,
        utc.sec,
        utc.msec
      )
    );
  }

  public toYMD(): IYMD {
    return {
      year: this.year,
      month: this.month,
      day: this.day,
    };
  }

  public toHHMM(): HHMM {
    return HHMM.from(
      `${("00" + this.hour.toString()).slice(-2)}${(
        "00" + this.min.toString()
      ).slice(-2)}`
    );
  }

  public static fromYMDHHMM(
    ymd: IYMD,
    hhmm: HHMM,
    utcOffset: AnyUTCOffset
  ): BDate {
    return BDate.fromLocalDateTimeValues(
      convertToUTCOffsetMinutes(utcOffset),
      ymd.year,
      ymd.month,
      ymd.day,
      hhmm.h,
      hhmm.m
    );
  }

  public static fromYMD(ymd: IYMD, utcOffset: AnyUTCOffset): BDate {
    return BDate.fromLocalDateTimeValues(
      convertToUTCOffsetMinutes(utcOffset),
      ymd.year,
      ymd.month,
      ymd.day
    );
  }

  /** calculations */

  public addMilliseconds(n: number) {
    const ndt = this.clone();
    ndt.msec += n;
    return ndt;
  }

  public addSeconds(n: number) {
    const ndt = this.clone();
    ndt.sec += n;
    return ndt;
  }

  public addMinutes(n: number) {
    const ndt = this.clone();
    ndt.min += n;
    return ndt;
  }

  public addHours(n: number) {
    const ndt = this.clone();
    ndt.hour += n;
    return ndt;
  }

  public addDays(n: number) {
    const ndt = this.clone();
    ndt.day += n;
    return ndt;
  }

  public addMonths(n: number) {
    const ndt = this.clone();
    ndt.month += n;
    return ndt;
  }

  public addYears(n: number) {
    const ndt = this.clone();
    ndt.year += n;
    return ndt;
  }

  public beginOfDay() {
    const ndt = this.clone();
    ndt.hour = 0;
    ndt.min = 0;
    ndt.sec = 0;
    ndt.msec = 0;
    return ndt;
  }

  public endOfDay() {
    const ndt = this.clone();
    ndt.hour = 23;
    ndt.min = 59;
    ndt.sec = 59;
    ndt.msec = 999;
    return ndt;
  }

  public beginOfWeek() {
    return this.addDays(-this.dayOfWeek).beginOfDay();
  }

  public endOfWeek() {
    return this.addDays(6 - this.dayOfWeek).endOfDay();
  }

  public beginOfMonth() {
    const ndt = this.clone();
    ndt.day = 1;
    return ndt.beginOfDay();
  }

  public endOfMonth() {
    const ndt = this.clone();
    ndt.month += 1;
    ndt.day = 1;
    return ndt.addDays(-1).endOfDay();
  }

  public beginOfYear() {
    const ndt = this.clone();
    ndt.month = 1;
    ndt.day = 1;
    return ndt.beginOfDay();
  }

  public endOfYear() {
    const ndt = this.clone();
    ndt.year += 1;
    ndt.month = 1;
    ndt.day = 1;
    return ndt.addDays(-1).endOfDay();
  }
}

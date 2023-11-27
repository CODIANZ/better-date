import { UTCOffsetMinutes, isValidUTCOffsetMinutes } from "./utc-offsets";

export class DateTimeCore {
  private m_rawDate: Date;
  public clone(): DateTimeCore {
    return new DateTimeCore(this.year, this.month, this.date, this.hour, this.minutes, this.seconds, this.milliseconds);
  }

  protected constructor(year: number, month: number, date: number, hour: number = 0, minute: number = 0, second: number = 0, ms: number = 0) {
    this.m_rawDate = new Date(Date.UTC(year, month, date, hour, minute, second, ms));
  }

  public static fromValues(year: number, month: number, date: number, hour: number = 0, minute: number = 0, second: number = 0, ms: number = 0) {
    return new DateTimeCore(year, month, date, hour, minute, second, ms);
  }

  public get milliseconds(): number { return this.m_rawDate.getUTCMilliseconds(); }
  public set milliseconds(n: number) { this.m_rawDate.setUTCMilliseconds(n); }
  public get seconds(): number { return this.m_rawDate.getUTCSeconds(); }
  public set seconds(n: number) { this.m_rawDate.setUTCSeconds(n); }
  public get minutes(): number { return this.m_rawDate.getUTCMinutes(); }
  public set minutes(n: number) { this.m_rawDate.setUTCMinutes(n); }
  public get hour(): number { return this.m_rawDate.getUTCHours(); }
  public set hour(n: number) { this.m_rawDate.setUTCHours(n); }
  public get day(): number { return this.m_rawDate.getUTCDay(); }
  public get date(): number { return this.m_rawDate.getUTCDate(); }
  public set date(n: number) { this.m_rawDate.setUTCDate(n); }
  public get month(): number { return this.m_rawDate.getUTCMonth(); }
  public set month(n: number) { this.m_rawDate.setUTCMonth(n); }
  public get year(): number { return this.m_rawDate.getUTCFullYear(); }
  public set year(n: number) { this.m_rawDate.setUTCFullYear(n); }

  public addMilliseconds(n: number){
    const ndt = this.clone();
    ndt.milliseconds += n;
    return ndt;
  }

  public addSeconds(n: number){
    const ndt = this.clone();
    ndt.seconds += n;
    return ndt;
  }

  public addMinutes(n: number){
    const ndt = this.clone();
    ndt.minutes += n;
    return ndt;
  }

  public addHours(n: number){
    const ndt = this.clone();
    ndt.hour += n;
    return ndt;
  }

  public addDate(n: number){
    const ndt = this.clone();
    ndt.date += n;
    return ndt;
  }

  public addMonth(n: number){
    const ndt = this.clone();
    ndt.month += n;
    return ndt;
  }

  public addYear(n: number){
    const ndt = this.clone();
    ndt.year += n;
    return ndt;
  }

  public beginningOfDay() {
    return DateTimeCore.fromValues(this.year, this.month, this.date);
  }

  public endOfDay() {
    return DateTimeCore.fromValues(this.year, this.month, this.date, 23, 59, 59, 999);
  }

  public beginningOfWeek() {
    return this.addDate(-this.day).beginningOfDay();
  }

  public endOfWeek() {
    return this.addDate(6 - this.day).endOfDay();
  }

  public beginningOfMonth() {
    return DateTimeCore.fromValues(this.year, this.month, 1);
  }

  public endOfMonth() {
    return this.beginningOfMonth().addMonth(1).addDate(-1).endOfDay();
  }

  public beginningOfYear() {
    return DateTimeCore.fromValues(this.year, 0, 1);
  }

  public endOfYear() {
    return this.beginningOfYear().addYear(1).addDate(-1).endOfDay();
  }

  private fragments = {
    YYYY: () => ("0000" + this.year.toString()).slice(-4),
    MM:   () => ("00"   +(this.month+1).toString()).slice(-2),
    DD:   () => ("00"   + this.date.toString()    ).slice(-2),
    hh:   () => ("00"   + this.hour.toString()   ).slice(-2),
    mm:   () => ("00"   + this.minutes.toString() ).slice(-2),
    ss:   () => ("00"   + this.seconds.toString() ).slice(-2),
    ms:   () => ("000"  + this.milliseconds.toString()).slice(-3),
    YY:   () => this.year.toString().slice(-2),
    M:    () => (this.month + 1).toString(),
    D:    () => this.date.toString(),
    h:    () => this.hour.toString(),
    m:    () => this.minutes.toString(),
    s:    () => this.seconds.toString()
  }

  /**
   * Format date-time string.
   * @param fmt A string that specifies formatting.
   * 
   * * %%    : char of '%'
   * * %YYYY : 4-digit year
   * * %YY   : 2-digit year
   * * %MM   : 2-digit month
   * * %DD   : 2-digit date
   * * %hh   : 2-digit hours
   * * %mm   : 2-digit minutes
   * * %ss   : 2-digit seconds
   * * %ms   : 3-digit milliseconds
   * * %m    : month
   * * %d    : date
   * * %h    : hours
   * * %m    : minutes
   * * %s    : seconds
   */
    public format(fmt: string){
      return fmt.replace(/%(%|YYYY|YY|MM|M|DD|D|hh|h|mm|ms|ss|m|s)/g, (match, p) => {
        switch(p){
          case "%":     return "%";    
          case "YYYY":  return this.fragments.YYYY();
          case "YY":    return this.fragments.YY();
          case "MM":    return this.fragments.MM();
          case "M":     return this.fragments.M();
          case "DD":    return this.fragments.DD();
          case "D":     return this.fragments.D();
          case "hh":    return this.fragments.hh();
          case "h":     return this.fragments.h();
          case "mm":    return this.fragments.mm();
          case "m":     return this.fragments.m();
          case "ss":    return this.fragments.ss();
          case "s":     return this.fragments.s();
          case "ms":    return this.fragments.ms();
        }
        return match;
      });
    }

  public toISOString() { return this.m_rawDate.toISOString(); }
  public toString(){
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

export class BDate extends DateTimeCore {
  private m_utcOffsetMinutes: UTCOffsetMinutes;

  public static isBDate(o: unknown): o is BDate {
    return o instanceof BDate;
  }
  public clone(): BDate {
    return new BDate(this.m_utcOffsetMinutes, this.year, this.month, this.date, this.hour, this.minutes, this.seconds, this.milliseconds);
  }

  private constructor(utcOffsetMinutes: UTCOffsetMinutes, year: number, month: number, date: number, hour: number = 0, minute: number = 0, second: number = 0, ms: number = 0) {
    super(year, month, date, hour, minute, second, ms);
    this.m_utcOffsetMinutes = utcOffsetMinutes;
  }

  public static now(): BDate {
    return BDate.fromJsDate(new Date());
  }

  public static from(anyValue: string | Date | BDate) {
    if(BDate.isBDate(anyValue)){
      return anyValue.clone();
    }
    else if(typeof anyValue === "string"){
      const jsdate = new Date(anyValue);
      return BDate.fromJsDate(jsdate);
    }
    else{
      return BDate.fromJsDate(anyValue);
    }
  }

  /**
   * Initialize it with a Javascript Date object. Use `getTimeZoneOffset()` for UTC offset.
   * @param jsDate Javascript Date object
   * @returns BDate
   */
  public static fromJsDate(jsDate: Date): BDate {
    const offset = jsDate.getTimezoneOffset();
    if(!isValidUTCOffsetMinutes(offset)) throw new Error("Invalid UTC offset.");

    return new BDate(
      offset,
      jsDate.getFullYear(),
      jsDate.getMonth(),
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
   * @param utcOffsetMinutes UTC offset in minutes
   * @returns BDate
   */
  public static fromJsDateWithOffset(jsDate: Date, utcOffsetMinutes: UTCOffsetMinutes) {
    return BDate.fromJsDateAsUTC(jsDate).newUTCOffset(utcOffsetMinutes);
  }

  /**
   * Initialize with UTC offset and local year, month, date, hour, minute, and second.
   * @param utcOffsetMinutes UTC offset in minutes
   * @param year 
   * @param month 
   * @param date 
   * @param hour 
   * @param minute 
   * @param second 
   * @param ms 
   * @returns 
   */
  public static fromDateTimeValuesWithOffset(utcOffsetMinutes: UTCOffsetMinutes, year: number, month: number, date: number, hour: number = 0, minute: number = 0, second: number = 0, ms: number = 0) {
    return new BDate(utcOffsetMinutes, year, month, date, hour, minute, second, ms);
  }

  /**
   * Initialize with UTC offset and UTC year, month, date, hour, minute, and second.
   * @param utcOffsetMinutes UTC offset in minutes
   * @param year 
   * @param month 
   * @param date 
   * @param hour 
   * @param minute 
   * @param second 
   * @param ms 
   * @returns BDate
   */
  public static fromUTCDateTimeValuesWithOffset(utcOffsetMinutes: UTCOffsetMinutes, year: number, month: number, date: number, hour: number = 0, minute: number = 0, second: number = 0, ms: number = 0) {
    const lt = DateTimeCore.fromValues(year, month, date, hour, minute, second, ms);
    lt.addMinutes(utcOffsetMinutes);
    return new BDate(utcOffsetMinutes, lt.year, lt.month, lt.date, lt.hour, lt.minutes, lt.seconds, lt.milliseconds);
  }

  /**
   * Initialize with UTC year, month, date, hour, minute, and second.
   * @param year 
   * @param month 
   * @param date 
   * @param hour 
   * @param minute 
   * @param second 
   * @param ms 
   * @returns BDate (UTC)
   */
  public static fromUTCDateTimeValues(year: number, month: number, date: number, hour: number = 0, minute: number = 0, second: number = 0, ms: number = 0) {
    return BDate.fromUTCDateTimeValuesWithOffset(0, year, month, date, hour, minute, second, ms);
  }

  public toUTC(): BDate {
    const localDate = this.clone();
    localDate.minutes -= this.m_utcOffsetMinutes;
    localDate.m_utcOffsetMinutes = 0;
    return localDate;
  }

  public isUTC(): boolean { return this.m_utcOffsetMinutes === 0; }
  public get utcOffsetMinutes(): number { return this.m_utcOffsetMinutes; }

  /**
   * Generate a LocalTime with a new UTC offset.
   * @param utcOffsetMinutes 
   * @returns BDate
   */
  public newUTCOffset(utcOffsetMinutes: UTCOffsetMinutes): BDate {
    const localDate = this.clone();
    localDate.minutes += utcOffsetMinutes - this.m_utcOffsetMinutes;
    localDate.m_utcOffsetMinutes = utcOffsetMinutes;
    return localDate;
  }

  public toJsDate(): Date {
    const utc = this.toUTC();
    return new Date(Date.UTC(utc.year, utc.month, utc.date, utc.hour, utc.minutes, utc.seconds, utc.milliseconds));
  }
}

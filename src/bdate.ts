export class BDate {
  private m_rawDate: Date;
  public get rawDate() { return this.m_rawDate; }
  public clone() { return new BDate(this); }

  public static isDateTime(o: unknown): o is BDate {
    return o instanceof BDate;
  }
  
  constructor(anyValue?: string | number | Date | BDate, month?: number, day?: number, hour?: number, minute?: number, second?: number, ms?: number) {
    if(BDate.isDateTime(anyValue)){
      this.m_rawDate = new Date(anyValue.rawDate);
    }
    else if(typeof anyValue === "number"){
      if(month !== undefined){
        this.m_rawDate = new Date(anyValue, month, day ?? 1, hour ?? 0, minute ?? 0, second ?? 0, ms ?? 0);
      }
      else{
        this.m_rawDate = new Date(anyValue);
      }
    }
    else if(anyValue === undefined){
      this.m_rawDate = new Date();
    }
    else{
      this.m_rawDate = new Date(anyValue);
    }
  }

  public static get Now() {
    return new BDate();
  }

  public get milliseconds() { return this.rawDate.getMilliseconds(); }
  public set milliseconds(n: number) { this.rawDate.setMilliseconds(n); }
  public get seconds() { return this.rawDate.getSeconds(); }
  public set seconds(n: number) { this.rawDate.setSeconds(n); }
  public get minutes() { return this.rawDate.getMinutes(); }
  public set minutes(n: number) { this.rawDate.setMinutes(n); }
  public get hours() { return this.rawDate.getHours(); }
  public set hours(n: number) { this.rawDate.setHours(n); }
  public get date() { return this.rawDate.getDate(); }
  public set date(n: number) { this.rawDate.setDate(n); }
  public get month() { return this.rawDate.getMonth(); }
  public set month(n: number) { this.rawDate.setMonth(n); }
  public get year() { return this.rawDate.getFullYear(); }
  public set year(n: number) { this.rawDate.setFullYear(n); }
  public get time() { return this.rawDate.getTime(); }
  public set time(n: number) { this.rawDate.setTime(n); }
  public get day() { return this.rawDate.getDay(); }
  public get timezoneOffset() { return this.rawDate.getTimezoneOffset(); }

  public get utc() {
    return new class {
      rawDate: Date;
      constructor(parent: BDate) { this.rawDate = parent.rawDate; }
      get milliseconds() { return this.rawDate.getUTCMilliseconds(); }
      set milliseconds(n: number) { this.rawDate.setUTCMilliseconds(n); }
      get seconds() { return this.rawDate.getUTCSeconds(); }
      set seconds(n: number) { this.rawDate.setUTCSeconds(n); }
      get minutes() { return this.rawDate.getUTCMinutes(); }
      set minutes(n: number) { this.rawDate.setUTCMinutes(n); }
      get hours() { return this.rawDate.getUTCHours(); }
      set hours(n: number) { this.rawDate.setUTCHours(n); }
      get date() { return this.rawDate.getUTCDate(); }
      set date(n: number) { this.rawDate.setUTCDate(n); }
      get month() { return this.rawDate.getUTCMonth(); }
      set month(n: number) { this.rawDate.setUTCMonth(n); }
      get year() { return this.rawDate.getUTCFullYear(); }
      set year(n: number) { this.rawDate.setUTCFullYear(n); }
      get day() { return this.rawDate.getUTCDay(); }
    }(this);
  }

  public addMilliseconds(n: number){
    const ndt = this.clone();
    ndt.rawDate.setMilliseconds(ndt.rawDate.getMilliseconds() + n);
    return ndt;
  }

  public addSeconds(n: number){
    const ndt = this.clone();
    ndt.rawDate.setSeconds(ndt.rawDate.getSeconds() + n);
    return ndt;
  }

  public addMinutes(n: number){
    const ndt = this.clone();
    ndt.rawDate.setMinutes(ndt.rawDate.getMinutes() + n);
    return ndt;
  }

  public addHours(n: number){
    const ndt = this.clone();
    ndt.rawDate.setHours(ndt.rawDate.getHours() + n);
    return ndt;
  }

  public addDate(n: number){
    const ndt = this.clone();
    ndt.rawDate.setDate(ndt.rawDate.getDate() + n);
    return ndt;
  }

  public addMonth(n: number){
    const ndt = this.clone();
    ndt.rawDate.setMonth(ndt.rawDate.getMonth() + n);
    return ndt;
  }

  public addYear(n: number){
    const ndt = this.clone();
    ndt.rawDate.setFullYear(ndt.rawDate.getFullYear() + n);
    return ndt;
  }

  public beginningOfDay() {
    // prettier-ignore
    return new BDate(
      new Date(
        this.rawDate.getFullYear(),
        this.rawDate.getMonth(),
        this.rawDate.getDate()
      )
    );
  }

  public endOfDay() {
    // prettier-ignore
    return new BDate(
      new Date(
        this.rawDate.getFullYear(),
        this.rawDate.getMonth(),
        this.rawDate.getDate(),
        23, 59, 59, 999
      )
    );
  }

  public beginningOfMonth() {
    // prettier-ignore
    return new BDate(
      new Date(
        this.rawDate.getFullYear(),
        this.rawDate.getMonth(),
        1
      )
    );
  }

  public endOfMonth() {
    const dt = this.beginningOfMonth().addMonth(1).addDate(-1);
    return dt.endOfDay();
  }

  public toTimeString(separator?: string, bWithMilliseconds?: boolean) {
    const sep = separator ?? ":";
    const withMS = bWithMilliseconds === undefined ? false: bWithMilliseconds;
    // prettier-ignore
    return  ("00"   + this.rawDate.getHours()  ).slice(-2) +
            sep +
            ("00"   + this.rawDate.getMinutes()).slice(-2) +
            sep +
            ("00"   + this.rawDate.getSeconds()).slice(-2) +
            (withMS ? "." + ("000" + this.rawDate.getMilliseconds()).slice(-3) : "");
  }

  public toDateString(separator?: string){
    const sep = separator ?? "/";
    // prettier-ignore
    return  ("0000" + this.rawDate.getFullYear()).slice(-4) +
            sep +
            ("00"   +(this.rawDate.getMonth()+1)).slice(-2) +
            sep +
            ("00"   + this.rawDate.getDate()    ).slice(-2);
  }

  public toString(p?: {
    dateSeparator?: string;
    timeSeparator?: string;
    dateTimeSeparator?: string;
    withMilliseconds?: boolean;
  }) {
    const sep = p?.dateTimeSeparator ?? " ";
    const ymd = this.toDateString(p?.dateSeparator);
    const hms = this.toTimeString(p?.timeSeparator, p?.withMilliseconds);
    return ymd + sep + hms;
  }

  public toISOString() {
    return this.rawDate.toISOString();
  }
}

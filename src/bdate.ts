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

  public static from(anyValue?: string | number | Date | BDate, month?: number, day?: number, hour?: number, minute?: number, second?: number, ms?: number){
    return new BDate(anyValue, month, day, hour, minute, second, ms);
  }

  public static get now() {
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

  public beginningOfWeek() {
    return this.addDate(-this.day).beginningOfDay();
  }

  public endOfWeek() {
    return this.addDate(6 - this.day).endOfDay();
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
    return this.beginningOfMonth().addMonth(1).addDate(-1).endOfDay();
  }

  public beginningOfYear() {
    // prettier-ignore
    return new BDate(
      new Date(
        this.rawDate.getFullYear(),
        0,
        1
      )
    );
  }

  public endOfYear() {
    // prettier-ignore
    return new BDate(
      new Date(
        this.rawDate.getFullYear(),
        11,
        31,
        23, 59, 59, 999
      )
    );
  }

  public toString(){
    return this.format("%YYYY/%MM/%DD %hh:%mm:%ss");
  }

  public toISOString() {
    return this.rawDate.toISOString();
  }

  public fragments = {
    YYYY: () => ("0000" + this.rawDate.getFullYear().toString()).slice(-4),
    MM:   () => ("00"   +(this.rawDate.getMonth()+1).toString()).slice(-2),
    DD:   () => ("00"   + this.rawDate.getDate().toString()    ).slice(-2),
    hh:   () => ("00"   + this.rawDate.getHours().toString()   ).slice(-2),
    mm:   () => ("00"   + this.rawDate.getMinutes().toString() ).slice(-2),
    ss:   () => ("00"   + this.rawDate.getSeconds().toString() ).slice(-2),
    ms:   () => ("000"  + this.rawDate.getMilliseconds().toString()).slice(-3),
    YY:   () => this.rawDate.getFullYear().toString().slice(-2),
    M:    () => (this.rawDate.getMonth() + 1).toString(),
    D:    () => this.rawDate.getDate().toString(),
    h:    () => this.rawDate.getHours().toString(),
    m:    () => this.rawDate.getMinutes().toString(),
    s:    () => this.rawDate.getSeconds().toString()
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
}

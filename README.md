# Better Date

## concept

BDate is a DATE object with a date and time and an arbitrary UTC offset.

## features

- Convert a specific local time to a different local time.
- Interoperating with Javascript Date objects.
- Implementation of getters and setters for each element.
- Addition / subtraction does not change the state of the instance.
- Months start at 1, not 0.
- Supports method chains.
- Supports formatting.
- Some utilities.

## usage

```ts
import { BDate } from "@codianz/better-date";

// You can calculate a specific time on Earth with any UTC offset.
{
  const bd_0900 = BDate.from("2020-01-01T09:00:00.00+09:00"); // local date time with offset +09:00
  console.log(bd_0900.toString()); // 2020/01/01 09:00:00 (local time)
  console.log(bd_0900.toISOStringWithOffset()); // 2020-01-01T09:00:00.000+09:00
  console.log(bd_0900.toISOString()); // 2020-01-01T00:00:00.000Z
  console.log(bd_0900.isUTC()); // false
  console.log(bd_0900.utcOffsetMinutes); // 540

  const bd_UTC = bd_0900.toUTC(); // UTC date time
  console.log(bd_UTC.toString()); // 2020/01/01 00:00:00 (local time)
  console.log(bd_UTC.toISOStringWithOffset()); // 2020-01-01T00:00:00.000+00:00
  console.log(bd_UTC.toISOString()); // 2020-01-01T00:00:00.000Z
  console.log(bd_UTC.isUTC()); // true
  console.log(bd_UTC.utcOffsetMinutes); // 0

  const bd_m0200 = bd_0900.newUTCOffset("-02:00"); // local date time with offset -02:00
  console.log(bd_m0200.toString()); // 2019/12/31 22:00:00 (local time)
  console.log(bd_m0200.toISOStringWithOffset()); // 2019-12-31T22:00:00.000-02:00
  console.log(bd_m0200.toISOString()); // 2020-01-01T00:00:00.000Z
  console.log(bd_m0200.isUTC()); // false
  console.log(bd_m0200.utcOffsetMinutes); // -120
}

// All date and time calculations are performed using the UTC offset time held by BDate.
{
  const bd = BDate.fromLocalDateTimeValues("-03:30", 2020, 1, 1);
  console.log(bd.toString()); // 2020/01/01 00:00:00
  const bd2 = bd
    .addYears(1)
    .addMonths(2)
    .addDays(3)
    .addHours(4)
    .addMinutes(5)
    .addSeconds(6)
    .addMilliseconds(7);
  console.log(bd2.toISOStringWithOffset()); // 2021-03-04T04:05:06.007-03:30
  console.log(bd2.toISOString()); // 2021-03-04T07:35:06.007Z
}

// Javascript Date object can be converted to BDate.
{
  const jsDate = new Date("2020-01-01T00:00:00.00+01:00");

  const bd = BDate.fromJsDate(jsDate);
  console.log(bd.toISOStringWithOffset()); // 2020-01-01T00:00:00.000+01:00
  console.log(bd.toISOString()); // 2019-12-31T23:00:00.000Z
  console.log(jsDate.toISOString()); // 2019-12-31T23:00:00.000Z

  const bd2 = bd.addDays(1);
  const jsDate2 = bd2.toJsDate();
  console.log(bd2.toISOStringWithOffset()); // 2020-01-02T00:00:00.000+01:00
  console.log(bd2.toISOString()); // 2020-01-01T23:00:00.000Z
  console.log(jsDate2.toISOString()); // 2020-01-01T23:00:00.000Z

  // The UTC offset of DATE varies depending on the execution environment.
  // This is the source of confusion!!
  console.log(jsDate2.toString()); // Sun Feb 02 2020 08:00:00 GMT+0900 (Japan Standard Time)
}

// When initialized with a Date object, the BDate's UTC offset is automatically initialized.
// (Running on JST +09:00)
{
  const jsDate = new Date(); // now
  const bd = BDate.fromJsDate(jsDate); // utc offset is taken from jsDate
  console.log(jsDate.getTimezoneOffset()); // -540 (UTC offset of Japan)
  console.log(bd.utcOffsetMinutes); // 540
}
```

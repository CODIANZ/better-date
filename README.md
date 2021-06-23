# Better Date

## concept

The BDate class internally holds a Date object and acts as a wrapper for the Date object.

## features

* Implementation of getters and setters for each element.
* Addition / subtraction does not change the state of the instance.
* Supports method chains.
* Easy to use toString().
* Some utilities.


## usage

```ts
import { BDate } from "@codianz/better-date";

const bd1 = new BDate(2019, 9, 9);
console.log(bd1.toString());  // 2019/10/09 00:00:00

const bd2 = bd1.addMinutes(66)
  .addSeconds(123)
  .addHours(-3)
  .addDate(-10)
  .addMonth(27)
  .addYear(1)
  .addMilliseconds(-1);
console.log(bd1.toString());  // 2019/10/09 00:00:00
console.log(bd2.toString());  // 2022/12/28 22:08:02

const bd22 = new BDate(bd1);
bd22.minutes += 66;
bd22.seconds += 123;
bd22.hours -= 3;
bd22.date -= 10;
bd22.month += 27;
bd22.year += 1;
bd22.milliseconds -= 1;
console.log(bd22.toString()); // 2022/12/28 22:08:02

const bd22u = new BDate(bd1);
bd22u.utc.minutes += 66;
bd22u.utc.seconds += 123;
bd22u.utc.hours -= 3;
bd22u.utc.date -= 10;
bd22u.utc.month += 27;
bd22u.utc.year += 1;
bd22u.utc.milliseconds -= 1;
console.log(bd22u.toString());  // 2022/12/28 22:08:02


const bd3 = new BDate(2019, 9, 9, 1, 2, 3, 4);
const bd3s = bd3.beginningOfDay();
const bd3e = bd3.endOfDay();
console.log(bd3.toString({withMilliseconds: true}));  // 2019/10/09 01:02:03.004
console.log(bd3s.toString({withMilliseconds: true})); // 2019/10/09 00:00:00.000
console.log(bd3e.toString({withMilliseconds: true})); // 2019/10/09 23:59:59.999

const bd3ms = bd3.beginningOfMonth();
const bd3me = bd3.endOfMonth();
console.log(bd3.toString({
  withMilliseconds: true,
  dateSeparator: "-",
  timeSeparator: "-",
  dateTimeSeparator: "T"
}));  // 2019-10-09T01-02-03.004
console.log(bd3ms.toString({
  withMilliseconds: true,
  dateSeparator: "-",
  timeSeparator: "-",
  dateTimeSeparator: "T"
}));  // 2019-10-01T00-00-00.000
console.log(bd3me.toString({
  withMilliseconds: true,
  dateSeparator: "-",
  timeSeparator: "-",
  dateTimeSeparator: "T"
}));  // 2019-10-31T23-59-59.999
```
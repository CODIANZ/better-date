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
import { BDate } from "better-date";

const d1 = new BDate(2019, 9, 9);
const d2 = d1.addMinutes(10).addSeconds(2);

console.log(d1.toString()); // "2019/10/09 00:00:00" 
console.log(d2.toString()); // "2019/10/09 00:10:02"

d1.hours += 5;

console.log(d1.toString()); // "2019/10/09 05:00:00"
```
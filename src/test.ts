import { BDate } from "./bdate";
import assert from "assert";

const d1 = new BDate(2019, 9, 9);
const d2 = d1.addMinutes(10).addSeconds(2);

assert.ok(d1.toString() === "2019/10/09 00:00:00");
assert.ok(d2.toString() === "2019/10/09 00:10:02");

d1.hours += 5;

assert.ok(d1.toString() === "2019/10/09 05:00:00");

const d3 = d1.beginningOfDay();
assert.ok(d3.toString() === "2019/10/09 00:00:00");

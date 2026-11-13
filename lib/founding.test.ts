import { test } from "node:test";
import assert from "node:assert/strict";
import { isFoundingActive } from "./founding.ts";

const base = { enabled: true, slotsTotal: 10, slotsLeft: 4, standardFrom: "2027-01-01" };
const before = new Date("2026-12-31T23:59:59Z");
const after = new Date("2027-01-01T00:00:00Z");

test("active before the date with slots left", () => {
  assert.equal(isFoundingActive(base, before), true);
});

test("hidden on and after standardFrom", () => {
  assert.equal(isFoundingActive(base, after), false);
});

test("hidden when no slots are left", () => {
  assert.equal(isFoundingActive({ ...base, slotsLeft: 0 }, before), false);
});

test("hidden when disabled", () => {
  assert.equal(isFoundingActive({ ...base, enabled: false }, before), false);
});

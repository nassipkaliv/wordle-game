import { assert, describe, expect, test } from "vitest";
import { calculateAttemptResult } from "./game";

describe("Test calculateAttemptResult", () => {
  test("Checking...", () => {
    expect(
      calculateAttemptResult({ solution: "кошка" , attempt: "нечто" })
    ).toEqual(["gray", "gray", "gray", "gray", "yellow"]);
  });

  test("Checking with same letters", () => {
    expect(
      calculateAttemptResult({ solution: "кошка" , attempt: "кучка" })
    ).toEqual(["gray", "gray", "gray", "green", "green"]);
  });

  test("In solution two same letters, in attempt one", () => {
    expect(
      calculateAttemptResult({ solution: "кошка" , attempt: "сумка" })
    ).toEqual(["gray", "gray", "gray", "green", "green"]);
  });

  test("Checking with two same letters one yellow second gray", () => {
    expect(
      calculateAttemptResult({ solution: "кошка" , attempt: "спрос" })
    ).toEqual(["green", "gray", "gray", "gray", "gray"]);
  });
});
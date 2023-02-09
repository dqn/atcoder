import { readFileSync } from "fs";

function println(val: Object): void {
  console.log(val.toString());
}

function inputs(): string[][] {
  return readFileSync("/dev/stdin", "utf8")
    .trim()
    .replace(/\r/g, "")
    .split("\n")
    .map((x) => x.split(" "));
}

function makeArray<T>(value: T, len: number): T[] {
  return [...Array(len)].map(() => value);
}

function makeArray2<T>(value: T, lenX: number, lenY: number): T[][] {
  return [...Array(lenY)].map(() => [...Array(lenX)].map(() => value));
}

function bigIntMax(...args: bigint[]): bigint {
  return args.reduce((m, e) => (e > m ? e : m));
}

function bigIntMin(...args: bigint[]): bigint {
  return args.reduce((m, e) => (e < m ? e : m));
}

function main() {}

main();

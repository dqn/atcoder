import { readFileSync } from "fs";

function main() {
  const input = inputs();
  const H = BigInt(input[0][0]);
  const A = input[1].map(BigInt);
  console.log(A.reduce((x, acc) => x + acc, 0n) >= H ? "Yes" : "No");
}

function inputs(): string[][] {
  return readFileSync("/dev/stdin", "utf8")
    .trim()
    .replace(/\r/g, "")
    .split("\n")
    .map((x) => x.split(" "));
}

function println(val: Object): void {
  console.log(val.toString());
}

function rep(
  begin: number,
  until: number,
  callback: (i: number) => void,
): void {
  for (let i = begin; i < until; ++i) {
    callback(i);
  }
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

main();

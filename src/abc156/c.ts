import { readFileSync } from "fs";

function main() {
  const input = inputs();

  const x = input[1].map(Number);
  const l = Math.min(...x);
  const r = Math.max(...x);

  let ans = Number.POSITIVE_INFINITY;
  rep(l, r + 1, (i) => {
    let h = 0;
    x.forEach((xi) => {
      h += Math.pow(xi - i, 2);
    });
    ans = Math.min(ans, h);
  });
  println(ans);
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

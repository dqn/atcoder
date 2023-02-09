import { readFileSync } from "fs";

function println(val: Object): void {
  console.log(val.toString());
}

function input(): string {
  return readFileSync("/dev/stdin", "utf8").trim();
}

function bigIntMax(...args: bigint[]): bigint {
  return args.reduce((m, e) => (e > m ? e : m));
}

function bigIntMin(...args: bigint[]): bigint {
  return args.reduce((m, e) => (e < m ? e : m));
}

function main() {
  const n = BigInt(input());
  println(n / 2n + (n % 2n));
}

main();

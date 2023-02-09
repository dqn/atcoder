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
  const [n, a, b] = input().split(" ").map(BigInt);

  const len = a + b;
  const ans = (n / len) * a + bigIntMin(a, n % len);

  println(ans);
}

main();

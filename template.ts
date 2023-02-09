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
  
}

main();

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

function main() {
  const b = makeArray2(false, 3, 3);
  const input = inputs();

  input.slice(4).forEach((x) => {
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        if (input[i][j] === x[0]) {
          b[i][j] = true;
        }
      }
    }
  });

  let ans = false;

  if (b[0][0] && b[0][1] && b[0][2]) ans = true;
  if (b[1][0] && b[1][1] && b[1][2]) ans = true;
  if (b[2][0] && b[2][1] && b[2][2]) ans = true;

  if (b[0][0] && b[1][0] && b[2][0]) ans = true;
  if (b[0][1] && b[1][1] && b[2][1]) ans = true;
  if (b[0][2] && b[1][2] && b[2][2]) ans = true;

  if (b[0][0] && b[1][1] && b[2][2]) ans = true;
  if (b[0][2] && b[1][1] && b[2][0]) ans = true;

  println(ans ? "Yes" : "No");
}

main();

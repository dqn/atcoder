import * as fs from "fs";

function input(): string {
  return fs.readFileSync("/dev/stdin", "utf8").trim();
}

function main() {
  const s = input();

  if (s === "AAA" || s === "BBB") {
    console.log("No");
  } else {
    console.log("Yes");
  }
}

main();

import { copyFile, mkdir, writeFile } from "fs/promises";
import fetch from "node-fetch";

const baseUrl = "https://atcoder.jp";

type Test = {
  input: string;
  output: string;
};

async function fetchTests(contest: string, task: string): Promise<Test[]> {
  const url = `${baseUrl}/contests/${contest}/tasks/${contest}_${task}`;
  const res = await fetch(url);
  const text = await res.text();

  const tests: Test[] = [];

  const matches1 = [...text.matchAll(/Sample Input \d.+?<pre>(.+?)<\/pre>/gs)];
  const matches2 = [...text.matchAll(/Sample Output \d.+?<pre>(.+?)<\/pre>/gs)];

  for (let i = 0; i < matches1.length; ++i) {
    tests.push({
      input: matches1[i][1].trim(),
      output: matches2[i][1].trim(),
    });
  }

  return tests;
}

async function main(): Promise<void> {
  const [contest, task] = process.argv.slice(2);
  await mkdir(`./src/${contest}`, { recursive: true });
  await copyFile(`./template.ts`, `./src/${contest}/${task}.ts`);
  const tests = await fetchTests(contest, task);
  const testTxt = tests
    .map((test) => `${test.input}\n\n${test.output}`)
    .join("\n---\n");
  await writeFile(`./src/${contest}/${task}.txt`, testTxt);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

import nodeFetch from "node-fetch";
import fetchCookie from "fetch-cookie";
import { readFile } from "fs/promises";
import { exec } from "child_process";
import config from "../config.json";

const baseUrl = "https://atcoder.jp";

const colors = {
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  white: "\x1b[37m",
};

const fetch = fetchCookie(nodeFetch);

async function execPromise(command: string, stdin: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = exec(command, (err, stdout) => {
      if (err !== null) {
        reject(err);
      }

      resolve(stdout.trim());
    });
    child.stdin?.write(stdin);
    child.stdin?.end();
  });
}

async function test(contest: string, task: string): Promise<boolean> {
  const testTxt = await readFile(`./src/${contest}/${task}.txt`, "utf-8");

  const tests = testTxt.split("\n---\n").map((x) => {
    const [input, output] = x.split("\n\n");
    return { input, output };
  });

  const command = `node ./dist/${contest}/${task}.js`;

  const results = await Promise.all(
    tests.map(async (x) => {
      const actual = await execPromise(command, x.input);

      return {
        actual: actual,
        input: x.input,
        output: x.output,
      };
    }),
  );

  const resultText = results
    .map((result, i) => {
      let text = `case ${i + 1}: `;

      if (result.actual === result.output) {
        text += `${colors.green}AC${colors.white}`;
      } else {
        text += `${colors.yellow}WA\n`;
        text += `${colors.green}${result.output}\n`;
        text += `${colors.yellow}${result.actual}`;
        text += colors.white;
      }

      return text;
    })
    .join("\n---\n");

  console.log(resultText);

  return results.every((x) => x.actual === x.output);
}

function encode(params: [string, string][]): string {
  return params
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
}

async function getCsrfToken(): Promise<string> {
  const res = await fetch(`${baseUrl}/login`);
  const text = await res.text();
  const matches = text.match(/var csrfToken = "(.+?)"/);

  if (matches === null) {
    throw new Error("cannot find CSRF token");
  }

  return matches[1];
}

async function login(
  csrfToken: string,
  username: string,
  password: string,
): Promise<void> {
  await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: encode([
      ["username", username],
      ["password", password],
      ["csrf_token", csrfToken],
    ]),
  });
}

async function submit(
  csrfToken: string,
  contest: string,
  task: string,
  src: string,
): Promise<void> {
  await fetch(`${baseUrl}/contests/${contest}/submit`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: encode([
      ["data.TaskScreenName", `${contest}_${task}`],
      ["data.LanguageId", "4030"],
      ["sourceCode", src],
      ["csrf_token", csrfToken],
    ]),
  });
}

async function main(): Promise<void> {
  const [contest, task] = process.argv.slice(2);

  const result = await test(contest, task);
  if (!result) {
    return;
  }

  const csrfToken = await getCsrfToken();
  await login(csrfToken, config.username, config.password);
  const src = await readFile(`./dist/${contest}/${task}.js`, "utf-8");
  await submit(csrfToken, contest, task, src);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

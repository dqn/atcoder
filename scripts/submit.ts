import nodeFetch from "node-fetch";
import fetchCookie from "fetch-cookie";
import { readFile } from "fs/promises";
import config from "../config.json";

const baseUrl = "https://atcoder.jp";

const fetch = fetchCookie(nodeFetch);

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
  const csrfToken = await getCsrfToken();
  await login(csrfToken, config.username, config.password);
  const src = await readFile(`./dist/src/${contest}/${task}.js`, "utf-8");
  await submit(csrfToken, contest, task, src);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

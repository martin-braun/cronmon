#!/usr/bin/env -S deno run --ext=ts --unstable --allow-read --allow-net --import-map=deno.json --lock=lock.json

import { env, Application, Context, Router } from "./deps.ts";

const router = new Router();

router.get("/", async (context: Context) => {
  try {
    const resp = await fetch(`${env["CRON_JOB_API_URL"]}/jobs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env["CRON_JOB_API_KEY"]}`,
      },
    });
    const json = await resp.json();
    const failedJobs = json["jobs"].filter(
      (job: { [x: string]: number }) => job["enabled"] && job["lastStatus"] > 1
    );
    if (failedJobs.length > 0) {
      context.response.status = 504;
      context.response.body = {
        success: false,
        msg: "Some jobs failed",
        // deno-lint-ignore no-explicit-any
        failedJobs: failedJobs.map((job: { [x: string]: any }) => job["title"]),
      };
      return;
    }
    context.response.body = {
      success: true,
      msg: "OK",
    };
  } catch (e) {
    context.response.status = 500;
    context.response.body = {
      success: false,
      msg: e,
    };
  }
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

const url = `${env["HOST"]}:${env["PORT"]}`;
console.log(`Server running on http://${url}`);
app.listen(url);

#!/usr/bin/env -S deno cache --reload --import-map=deno.json --lock=lock.json

export { default as __ } from "dirname/mod.ts";
export type { IMakeLoc } from "dirname/types.ts";

export * as dotenv from "std/dotenv/mod.ts";

export { Application, Context, Router } from "oak/mod.ts";

#!/usr/bin/env -S deno cache --unstable --reload --import-map=deno.json --lock=lock.json

export { default as __ } from "https://deno.land/x/dirname@1.1.2/mod.ts";
export type { IMakeLoc } from "https://deno.land/x/dirname@1.1.2/types.ts";

import { config, DotenvConfig } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
const env: DotenvConfig = config();
export { env };

// export * as fs from "std/fs/mod.ts";
// export * as path from "std/path/mod.ts";
// export * as io from "std/io/mod.ts";
// export * as streams from "std/streams/mod.ts";
// export { crypto, KeyStack } from "std/crypto/mod.ts";
//
// import * as hex from "std/encoding/hex.ts";
// export const encoding = {
//   hex,
// };
//
// export { Color } from "https://deno.land/x/color@v0.3.0/mod.ts";

// export { Str } from "npm:@supercharge/strings@2.0.0";

// export type { Req, Res } from "oak/mod.ts";
export { Application, Context, Router } from "oak/mod.ts";

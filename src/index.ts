import { getApp } from "./app";
import { getCli } from "./cli";
import { getConfig } from "./config";
import { getLogger } from "./logger";
import { getValidator } from "./validator";

export type Cli = ReturnType<typeof getCli>;
export type Config = ReturnType<typeof getConfig>;
export type Logger = Awaited<ReturnType<typeof getLogger>>;
export type Validator = ReturnType<typeof getValidator>;
export type App = Awaited<ReturnType<typeof getApp>>;
export { getApp };

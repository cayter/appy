import { getConfig } from "./config";
import pino from "pino";

export async function getLogger<T extends ReturnType<typeof getConfig>>(
	config: T,
	opts?: pino.LoggerOptions,
) {
	if (config.APP_ENV === "development") {
		const { default: pinoPretty } = await import("pino-pretty");

		return pino(pinoPretty(opts));
	}

	return pino(opts);
}

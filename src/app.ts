import { getCli } from "./cli";
import { getConfig } from "./config";
import { getLogger } from "./logger";

export function getApp() {
	const config = getConfig(process.env);
	const logger = getLogger(config);
	const cli = getCli(config, logger);

	return {
		cli,
		config,
		logger,
	};
}

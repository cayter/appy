import { getCli } from "./cli";
import { getConfig } from "./config";
import { getLogger } from "./logger";
import { renderToString } from "react-dom/server";

export async function getApp() {
	const config = getConfig(process.env);
	const logger = await getLogger(config);
	const cli = getCli(config, logger);

	return {
		cli,
		config,
		logger,
		renderToString,
	};
}

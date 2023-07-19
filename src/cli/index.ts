import { Config, Logger } from "..";
import cac from "cac";

export function getCli(config: Config, logger: Logger) {
	const cli = cac("app").usage("[command] [options]");
	cli.help();

	if (config.APP_ENV === "development") {
	}

	return cli;
}

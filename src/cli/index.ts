import { Config, Logger } from "..";
import cac from "cac";

export async function getCli(name: string, config: Config, logger: Logger) {
	const cli = cac(name).usage("[command] [options]");
	cli.help();

	if (config.APP_ENV === "development") {
	}

	return cli;
}

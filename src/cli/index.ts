import type { Config, Logger } from "..";
import downCmd from "./down";
import resetCmd from "./reset";
import serverCmd from "./server";
import upCmd from "./up";
import workerCmd from "./worker";
import cac from "cac";

export function getCli(config: Config, logger: Logger) {
	const cli = cac("app").usage("[command] [options]");
	cli.help();

	if (config.APP_ENV === "development") {
		downCmd(cli, logger);
		resetCmd(cli, config, logger);
		upCmd(cli, config, logger);
	}

	serverCmd(cli, config, logger);
	workerCmd(cli, config, logger);

	return cli;
}

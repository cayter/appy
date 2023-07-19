import type { Config, Logger } from "..";
import { CAC } from "cac";

export default function upCmd(cli: CAC, config: Config, logger: Logger) {
	cli
		.command(
			"up",
			"Create and start the containers in docker-compose.yml, run the database migrations/seeds.",
		)
		.action(async () => {
			await up(config, logger);
		});
}

export async function up(config: Config, logger: Logger) {
	const msg = "Setting up docker compose cluster...";
	logger.info(msg);

	const { stderr, success } = Bun.spawnSync(
		"docker compose up -d --wait".split(" "),
	);

	if (success) {
		logger.info(`${msg} DONE`);
	} else {
		logger.error(stderr.toString().trimEnd());
	}
}

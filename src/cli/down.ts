import type { Cli, Logger } from "..";

export default function downCmd(cli: Cli, logger: Logger) {
	cli
		.command("down", "Stop and destroy the containers in docker-compose.yml.")
		.action(async () => {
			down(logger);
		});
}

export function down(logger: Logger) {
	const msg = "Tearing down docker compose cluster...";
	logger.info(msg);

	const { stderr, success } = Bun.spawnSync(
		"docker compose down --remove-orphans".split(" "),
	);

	if (success) {
		logger.info(`${msg} DONE`);
	} else {
		logger.error(stderr.toString().trimEnd());
	}
}

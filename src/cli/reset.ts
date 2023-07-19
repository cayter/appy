import type { Cli, Config, Logger } from "..";
import { down } from "./down";
import { up } from "./up";

export default function resetCmd(cli: Cli, config: Config, logger: Logger) {
	cli
		.command("reset", "Run down and up commands in 1 shot.")
		.action(async () => {
			down(logger);
			await up(config, logger);
		});
}

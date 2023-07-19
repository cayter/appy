import type { Config, Logger } from "..";
import { CAC } from "cac";

export default function workerCmd(cli: CAC, config: Config, logger: Logger) {
	cli.command("worker", "Start the worker.").action(async () => {
		logger.info("Worker is now running...");
	});
}

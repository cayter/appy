import type { Config, Logger } from "..";
import { CAC } from "cac";

export default function serverCmd(cli: CAC, config: Config, logger: Logger) {
	cli.command("server", "Start the server.").action(async () => {
		await serve(config, logger);
	});
}

export function serve(config: Config, logger: Logger) {
	const port = config.PORT || 3000;

	Bun.serve({
		development: config.APP_ENV === "development",
		fetch(req, server) {
			if (server.upgrade(req)) {
				return;
			}

			return new Response("appy");
		},
		port,
		websocket: {
			message(ws, message) {},
			open(ws) {},
			close(ws, code, message) {},
			drain(ws) {},
		},
	});

	logger.info(`Server is now listening on http://localhost:${port}...`);
}

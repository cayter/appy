import { format } from "node:util";
import { z } from "zod";

export const baseSchema = z.object({
	/**
	 * The application directory.
	 *
	 * @default "app"
	 */
	APP_DIR: z.string().default("app"),

	/**
	 * The application environment.
	 *
	 * @default "development"
	 */
	APP_ENV: z
		.enum(["development", "preview", "production", "sandbox", "staging"])
		.default("development"),

	/**
	 * The application name which will be used for:
	 * - the application executable name
	 * - the application database connections identifier
	 *
	 * @default "appy"
	 */
	APP_NAME: z.string().default("appy"),
});

// rome-ignore lint/suspicious/noExplicitAny:
export type Config<T extends z.ZodObject<any, any>> = ReturnType<
	typeof getConfig<T>
>;

// rome-ignore lint/suspicious/noExplicitAny:
export function getConfig<T extends z.ZodObject<any, any>>(
	data: unknown,
	appSchema?: T,
): T extends undefined
	? z.infer<typeof baseSchema>
	: z.infer<typeof baseSchema> & z.infer<T> {
	const schema = appSchema ? baseSchema.merge(appSchema) : baseSchema;
	const result = schema.safeParse(data);

	if (!result.success) {
		const messages = ["Invalid configuration:"];

		result.error.errors.map((err) => composeErrorMessages(messages, err));
		throw new Error(messages.join("\n"));
	}

	return result.data as T extends undefined
		? z.infer<typeof baseSchema>
		: z.infer<typeof baseSchema> & z.infer<T>;
}

function composeErrorMessages(messages: string[], err: z.ZodIssue) {
	switch (err.code) {
		case "invalid_date":
			messages.push(format("- %s should be a date", err.path.join(".")));
			break;

		case "invalid_enum_value":
			messages.push(
				format(
					"- %s should be one of the values: %s",
					err.path.join("."),
					err.options.join(", "),
				),
			);

			break;

		case "invalid_string":
			messages.push(
				format(
					"- %s should be %s %s string",
					err.path.join("."),
					["a", "e", "i", "o", "u"].includes(err.validation.toString()[0])
						? "an"
						: "a",
					err.validation,
				),
			);

			break;

		case "invalid_type": {
			let expected = err.expected.toString();

			if (expected.includes("' | '")) {
				messages.push(
					format(
						"- %s should be one of values: %s",
						err.path.join("."),
						expected.replaceAll(" | ", ", "),
					),
				);
			} else {
				messages.push(
					format("- %s should be a %s", err.path.join("."), expected),
				);
			}

			break;
		}
	}
}

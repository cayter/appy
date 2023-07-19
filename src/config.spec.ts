import { getConfig } from "./config";
import { getValidator } from "./validator";
import { describe, expect, test } from "bun:test";

const validator = getValidator();

describe("getConfig", () => {
	test("should return default values for the baseSchema", () => {
		const config = getConfig({});

		expect(config).toEqual({
			APP_DIR: "app",
			APP_ENV: "development",
			APP_NAME: "appy",
		});
	});

	test("should merge baseSchema with custom schema", () => {
		const customSchema = validator.object({ CUSTOM: validator.string() });
		const config = getConfig(
			{
				APP_ENV: "production",
				CUSTOM: "custom_value",
			},
			customSchema,
		);

		expect(config).toEqual({
			APP_DIR: "app",
			APP_ENV: "production",
			APP_NAME: "appy",
			CUSTOM: "custom_value",
		});
	});

	test("should throw error on invalid config", () => {
		expect(() => getConfig({ APP_ENV: "invalid_value" })).toThrow();
	});

	test("should throw error on invalid APP_ENV", () => {
		try {
			getConfig({ APP_ENV: "invalid_value" });
		} catch (err) {
			expect((err as Error).message).toContain("Invalid configuration:");
			expect((err as Error).message).toContain(
				"- APP_ENV should be one of the values: development, preview, production",
			);
		}
	});

	test("should throw error on invalid custom value", () => {
		try {
			getConfig(
				{ APP_ENV: "production", CUSTOM: 123 },
				validator.object({ CUSTOM: validator.string() }),
			);
		} catch (err) {
			expect((err as Error).message).toContain("Invalid configuration:");
			expect((err as Error).message).toContain("- CUSTOM should be a string");
		}
	});

	test("should allow customSchema to override baseSchema", () => {
		const customSchema = validator.object({
			APP_ENV: validator.coerce.number(),
		});
		const config = getConfig({ APP_ENV: "123" }, customSchema);

		expect(config).toEqual({ APP_DIR: "app", APP_ENV: 123, APP_NAME: "appy" });
	});
});

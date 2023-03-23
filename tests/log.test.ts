import { Logger } from "../src/mod.ts";

Deno.test("Logger should log message", () => {
  const logger = new Logger("TEST");
  logger.debug("Hello, world!");
  logger.info("Hello, world!");
  logger.warn("Hello, world!");
  logger.error("Hello, world!");
});

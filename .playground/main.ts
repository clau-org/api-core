import { Application } from "https://deno.land/x/oak/mod.ts";
import { validateRequest } from "../src/middleware/validate.ts";
import { z } from "../deps.ts";
import { Logger } from "../src/log.ts";

const app = new Application();
const logger = new Logger("some");

app.use(
  validateRequest({
    logger,
    schema: z.object({
      text: z.string(),
    }),
  }),
  (ctx) => {
    ctx.response.body = "Hello world!";
  }
);

app.addEventListener("listen", ({ port, secure }) => {
  console.log(
    `Server started on ${secure ? "https://" : "http://"}localhost:${port}`
  );
});

const port = 8000;
await app.listen({ port });

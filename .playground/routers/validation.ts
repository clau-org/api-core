import { validate } from "../../src/middleware/validate.ts";
import { ApiRouter } from "../../src/api.ts";
import { z } from "https://deno.land/x/zod@v3.21.4/mod.ts";

const helloRouter = new ApiRouter();

helloRouter.all(
  "/",
  validate({
    schema: z.object({
      hello: z.string(),
    }),
  }),
  (ctx) => {
    ctx.response.body = {
      message: `Hello from PLATFORM-API`,
    };
  },
);

export { helloRouter };

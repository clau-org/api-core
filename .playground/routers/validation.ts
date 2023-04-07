import { validate } from "../../src/middleware/validate.ts";
import { ApiRouter } from "../../src/api.ts";
import { z } from "https://deno.land/x/zod@v3.21.4/mod.ts";

const helloRouter = new ApiRouter();

helloRouter.all(
  "/",
  validate({
    schema: z.object({
      hello: z.string(),
      bye: z.string(),
    }),
  }),
  async (ctx) => {
    const { dbClient } = ctx.app.state;
    const { users: usersModel } = dbClient;
    const { hello } = ctx.state.requestData;

    const user = await usersModel.findMany({ take: 4 })
    ctx.response.body = {
      user,
      message:  `Hello from PLATFORM-API ${hello}`,
    };
  },
);

export { helloRouter };

import { ApiRouter, validate } from "../../mod.ts";
import { z } from "https://deno.land/x/zod@v3.21.4/mod.ts";

const helloRouter = new ApiRouter();

helloRouter.all(
  "/",
  validate({
    schema: z.object({
      message: z.string().nullish(),
    }),
  }),
  async (ctx) => {
    const { dbClient, logger } = ctx.app.state;
    const { message } = ctx.state.requestData;
    const { users: usersModel } = dbClient;

    const user = await usersModel.findMany({ take: 4 });

    logger.debug({ message, user });

    ctx.response.body = {
      user,
      message,
    };
  },
);

helloRouter.all(
  "/hello",
  validate({
    schema: z.object({
      message: z.string().nullish(),
    }),
  }),
  async (ctx) => {
    const { dbClient, logger } = ctx.app.state;
    const { message } = ctx.state.requestData;
    const { users: usersModel } = dbClient;

    const user = await usersModel.findMany({ take: 4 });

    logger.debug({ message, user });

    ctx.response.body = {
      user,
      message,
    };
  },
);

export { helloRouter };

import { Middleware } from "../../deps.ts";

const errorHandler: Middleware = async (ctx, next) => {
  const { logger } = ctx.app.state;
  try {
    await next();
  } catch (error) {
    logger.error({ error });
    ctx.response.status = error.status || 500;
    ctx.response.body = {
      error,
      message: error.message,
      stack: error.stack,
    };
  }
};

export { errorHandler };

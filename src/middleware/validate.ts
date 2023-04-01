import { Context } from "../../deps.ts";
import { getQuery } from "../../deps.ts";
import { Schema, ZodError } from "../../deps.ts";

interface ValidationError {
  errors: { message: string }[];
}

function validate({ schema }: { schema: Schema }) {
  const middleware: any = async (
    ctx: Context,
    next: () => Promise<void>,
  ): Promise<any> => {
    const { logger } = ctx.app.state;

    try {
      ctx.state.requestData = {};

      let body = await (ctx.request.body().value);
      let bodyUrl = Object.fromEntries(body?.entries?.() || []);
      let query = getQuery(ctx);

      logger.debug("[ORIGINAL DATA]", {
        body,
        bodyUrl,
        query,
        request: ctx.request,
        body2: await ctx.request.body(),
      });

      // Clear body if body is URL encoded
      if (Object.keys(bodyUrl).length > 0) body = {};

      const data = {
        ...body,
        ...bodyUrl,
        ...query,
      };

      logger.debug("[DATA BEFORE VALIDATION]", data);

      if (schema) schema.parse(data);

      logger.debug("[DATA AFTER VALIDATION]", data);

      ctx.state.requestData = data;

      await next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError: ValidationError = {
          errors: error.errors.map((err: { message: any }) => ({
            message: err.message,
          })),
        };

        logger.error("[DATA VALIDATION ERROR]", validationError);

        ctx.response.status = 400;
        ctx.response.body = validationError;
      } else {
        throw error;
      }
    }
  };

  return middleware;
}

export { validate };

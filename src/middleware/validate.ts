import { Middleware } from "../../deps.ts";
import { getQuery } from "../../deps.ts";
import { Schema, ZodError } from "../../deps.ts";

// Define a validate function that returns a Middleware
function validate({ schema }: { schema: Schema }) {
  const middleware: Middleware = async (ctx, next): Promise<any> => {
    const { logger } = ctx.app.state;

    try {
      // Initialize requestData property
      ctx.state.requestData = {};

      // Get request body and query parameters
      let body = await ctx.request.body().value;
      let bodyUrl = Object.fromEntries(body?.entries?.() || []);
      let query = getQuery(ctx);

      // Log the original data
      logger.debug("[middleware: validate][original data]", {
        body,
        bodyUrl,
        query,
        request: ctx.request,
        body2: await ctx.request.body(),
      });

      // Clear body if body is URL encoded
      if (Object.keys(bodyUrl).length > 0) body = {};

      // Combine body, bodyUrl, and query parameters into a single object
      const data = {
        ...body,
        ...bodyUrl,
        ...query,
      };

      // Log the data before validation
      logger.debug("[middleware: validate][before validation]", data);

      // Validate data against the provided schema, if provided
      if (schema) schema.parse(data);

      // Log the data after validation
      logger.debug("[middleware: validate][after validation]", data);

      // Set requestData property to the validated data
      ctx.state.requestData = data;

      // Call the next middleware function
      await next();
    } catch (error) {
      // Handle Zod validation errors
      if (error instanceof ZodError) {
        // Log the validation error and return a 400 status with the error message
        logger.error("[middleware: validate][validation error]", error);

        ctx.response.status = 400;
        ctx.response.body = { error };
      } else {
        // Rethrow other types of errors
        throw error;
      }
    }
  };

  return middleware;
}

// Export the validate function
export { validate };

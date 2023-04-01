// Import Context and getQuery functions from the Oak framework, and the Schema and ZodError classes from the Zod library
import { Context } from "../../deps.ts";
import { getQuery } from "../../deps.ts";
import { Schema, ZodError } from "../../deps.ts";

// Define a ValidationError interface for error messages
interface ValidationError {
  errors: { message: string }[];
}

// Define a validate function that returns a middleware function
function validate({ schema }: { schema: Schema }) {
  const middleware: any = async (
    ctx: Context,
    next: () => Promise<void>,
  ): Promise<any> => {
    const { logger } = ctx.app.state;

    try {
      // Initialize requestData property
      ctx.state.requestData = {};

      // Get request body and query parameters
      let body = await (ctx.request.body().value);
      let bodyUrl = Object.fromEntries(body?.entries?.() || []);
      let query = getQuery(ctx);

      // Log the original data
      logger.debug("[ORIGINAL DATA]", {
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
      logger.debug("[DATA BEFORE VALIDATION]", data);

      // Validate data against the provided schema, if provided
      if (schema) schema.parse(data);

      // Log the data after validation
      logger.debug("[DATA AFTER VALIDATION]", data);

      // Set requestData property to the validated data
      ctx.state.requestData = data;

      // Call the next middleware function
      await next();
    } catch (error) {
      // Handle Zod validation errors
      if (error instanceof ZodError) {
        const validationError: ValidationError = {
          errors: error.errors.map((err: { message: any }) => ({
            message: err.message,
          })),
        };

        // Log the validation error and return a 400 status with the error message
        logger.error("[DATA VALIDATION ERROR]", validationError);

        ctx.response.status = 400;
        ctx.response.body = validationError;
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

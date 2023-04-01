// Import the validate function from the validate middleware module, as well as the Schema and z functions from the Zod library, and the assertEquals function from the test framework
import { validate } from "../../src/middleware/validate.ts";
import { Schema, z } from "../../deps.ts";
import { assertEquals } from "../../deps_tests.ts";

// Define a test suite for the validate middleware
Deno.test(
  "validateRequest should validate and parse data correctly",
  async () => {
    // Define a Zod schema to validate the request data
    const schema: Schema = z.object({
      name: z.string().nonempty(),
      age: z.number().min(18),
    });

    // Define mock logger with debug and error methods
    const logger: any = { debug: () => {}, error: () => {} };

    // Create validate middleware using the schema
    const middleware = validate({ schema });

    // Define a mock next middleware function
    const mockNext = async () => {};

    // Define a mock Oak context object with a request object that returns a Promise with sample request data, and empty state and response objects
    const mockCtx: any = {
      app: {
        state: {
          logger,
        },
      },
      request: {
        url: {
          searchParams: [],
        },
        body() {
          return {
            value: new Promise((resolve) => {
              resolve({ name: "Alice", age: 30 });
            }),
          };
        },
      },
      state: {},
      response: {},
    };

    // Call the middleware function with the mock context and next middleware function
    await middleware(mockCtx, mockNext);

    // Assert that the requestData property on the context state matches the expected parsed data
    assertEquals(mockCtx.state.requestData, {
      name: "Alice",
      age: 30,
    });
  },
);

// Define another test to ensure validation errors are handled properly
Deno.test(
  "validateRequest should return validation error if data is invalid",
  async () => {
    // Define a Zod schema to validate the request data
    const schema: Schema = z.object({
      name: z.string().nonempty(),
      age: z.number().min(18),
    });

    // Define mock logger with debug and error methods
    const logger: any = { debug: () => {}, error: () => {} };

    // Create validate middleware using the schema
    const middleware = validate({ schema });

    // Define a mock next middleware function
    const mockNext = async () => {};

    // Define a mock Oak context object with a request object that returns a Promise with invalid request data, and empty state and response objects
    const mockCtx: any = {
      app: {
        state: {
          logger,
        },
      },
      request: {
        url: {
          searchParams: [],
        },
        async body() {
          return {
            value: {
              name: "",
              age: 10,
            },
          };
        },
      },
      state: {},
      response: {},
    };

    // Call the middleware function with the mock context and next middleware function
    await middleware(mockCtx, mockNext);

    // Assert that the response status is 400 (Bad Request)
    assertEquals(mockCtx.response.status, 400);
  },
);

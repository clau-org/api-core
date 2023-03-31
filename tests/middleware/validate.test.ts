import { validate } from "../../src/middleware/validate.ts";
import { Schema, z } from "../../deps.ts";
import { assertEquals } from "../../deps_tests.ts";

Deno.test(
  "validateRequest should validate and parse data correctly",
  async () => {
    const schema: Schema = z.object({
      name: z.string().nonempty(),
      age: z.number().min(18),
    });

    const logger: any = { debug: () => {}, error: () => {} };

    const middleware = validate({ schema });

    const mockNext = async () => {};

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
              name: "Alice",
              age: 30,
            },
          };
        },
      },

      state: {},
      response: {},
    };

    await middleware(mockCtx, mockNext);

    assertEquals(mockCtx.state.requestData, {
      name: "Alice",
      age: 30,
    });
  }
);

Deno.test(
  "validateRequest should return validation error if data is invalid",
  async () => {
    const schema: Schema = z.object({
      name: z.string().nonempty(),
      age: z.number().min(18),
    });

    const logger: any = { debug: () => {}, error: () => {} };

    const middleware = validate({ schema });

    const mockNext = async () => {};

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

    await middleware(mockCtx, mockNext);

    assertEquals(mockCtx.response.status, 400);
  }
);

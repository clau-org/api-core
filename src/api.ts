import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { Logger } from "./log.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

export type ApiContext = {
  logger: Logger;
};

export type ApiConfig = {
  name: string;
  port?: number;
  prefix?: string;
};

export class ApiRouter extends Router {
  logger?: Logger;

  setLogger(logger: Logger) {
    this.logger = logger;
  }
}

export class API {
  config: ApiConfig;
  app?: Application<ApiContext>;
  routers: Router[];
  logger: Logger;

  constructor(config: ApiConfig) {
    const { name, port } = config;

    this.config = {
      name,
      port,
    };

    this.logger = new Logger({
      prefix: name,
    });

    this.routers = [];

    this.logger.debug("[API CREATED]");
  }

  addRouter(router: ApiRouter) {
    router.setLogger(this.logger);
    this.routers.push(router);
  }

  async listen() {
    this.app = new Application<ApiContext>();
    this.app.state.logger = this.logger;

    this.app.use(oakCors());

    for (const router of this.routers) {
      this.app.use(router.routes());
      this.app.use(router.allowedMethods());
    }

    this.app.addEventListener("listen", ({ port, secure }) => {
      const name = this.config.name.toUpperCase();
      this.logger.info(
        `API ${name} started on ${
          secure ? "https://" : "http://"
        }localhost:${port}`,
      );
    });

    const port = this.config.port ?? 8000;

    return this.app.listen({ port });
  }
}

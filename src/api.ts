// Import required modules
import { Application, DBClient, oakCors, Router } from "../deps.ts";
import { Logger } from "./log.ts";
import { errorHandler } from "./middleware/error.ts";

// Define types for API context and configuration
export type ApiContext = {
  logger: Logger;
  dbClient?: DBClient;
};

export type ApiConfig = {
  name: string;
  port?: number;
  logLevel?: number;
  dbUrl?: string;
};

// Define a custom router that extends Oak's Router
export class ApiRouter extends Router {}

// Define an API class that uses Oak and the custom router
export class API {
  config: ApiConfig;
  app?: Application<ApiContext>;
  routers: ApiRouter[];
  logger: Logger;
  dbClient?: DBClient;

  // Initialize the API with a configuration object
  constructor(config: ApiConfig) {
    const { name, port, dbUrl, logLevel } = config;

    // Save the configuration options
    this.config = {
      name,
      port,
      dbUrl,
    };

    // Create a logger instance with the API name as prefix
    this.logger = new Logger({
      prefix: name,
      level: logLevel ?? Logger.levels.debug,
    });

    // Create a DBClient instance if exist dbUrl
    if (dbUrl) {
      this.dbClient = new DBClient({
        datasources: {
          db: { url: dbUrl },
        },
      });
    }

    // Create an empty array to store the routers
    this.routers = [];
    this.logger.debug(`[method: constructor][api created]`);
  }

  // Add a router to the API
  addRouter(router: ApiRouter) {
    this.routers.push(router);
    router.forEach(({ path, methods }) =>
      this.logger.debug("[method: addRouter][route added]", { path, methods })
    );
    this.logger.debug(`[method: addRouter][router added]`);
  }

  // Set dbUrl on DBClient and initialize the client
  setDBUrl({ url }: { url: string }) {
    this.dbClient = new DBClient({ datasources: { db: { url } } });
    this.logger.debug(`[method: dbUrl][db url changed]`, { url });
  }

  // set config on DBClient and initialize the client
  setDBClient(config: any) {
    this.dbClient = new DBClient(config);
    this.logger.debug(`[method: setDBClient][db client changed]`, { config });
  }

  // Set up the Oak application
  setupApp() {
    // Create a new Oak application instance
    this.app = new Application<ApiContext>();

    // Set api context
    let state: ApiContext = {
      logger: this.logger,
      dbClient: this.dbClient,
    };

    this.app.state = state;

    // Add CORS middleware to the app
    this.app.use(oakCors());

    // Add generic error handler middleware
    this.app.use(errorHandler);

    // Add each router's routes and allowed methods to the app
    for (const router of this.routers) {
      this.app.use(router.routes());
      this.app.use(router.allowedMethods());
    }

    this.logger.debug(`[method: setupApp][routers added]`);

    // Listen for the "listen" event and log when the API starts
    this.app.addEventListener("listen", ({ port, secure, hostname }) => {
      const config = this.config;
      let protocol = secure ? "https" : "http";
      let url = `${protocol}://${hostname}:${port}`;
      const apiData = {
        hostname,
        secure,
        port,
        protocol,
        url,
      };
      this.logger.debug("[method: listen][config]", config);
      this.logger.info("[method: listen][api data]", apiData);
    });

    this.logger.debug("[method: setupApp][setup finished]");
  }

  // Start listening on the specified port or default port (8000)
  async listen({ port }: { port?: number } = {}) {
    // Set up the Oak application
    this.setupApp();

    // Get the actual port to listen on
    const listenPort = port ?? this.config.port ?? 8000;

    // Start listening on the actual port and return the server instance
    return this.app?.listen({ port: listenPort });
  }
}

// Import required modules
import { Application, Router } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import { Logger } from "./log.ts";
import { DBClient } from "../deps.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

// Define types for API context and configuration
export type ApiContext = {
  logger:   Logger;
  dbClient: DBClient;
};

export type ApiConfig = {
  name: string;
  port?: number;
  dbUrl?: string;
};

// Define a custom router that extends Oak's Router
export class ApiRouter extends Router {

}

// Define an API class that uses Oak and the custom router
export class API {
  config: ApiConfig;
  app?: Application;
  routers: ApiRouter[];
  logger: Logger;
  dbClient?: DBClient;

  // Initialize the API with a configuration object
  constructor(config: ApiConfig) {
    const { name, port, dbUrl } = config;

    // Save the configuration options
    this.config = {
      name,
      port,
      dbUrl,
    };

    // Create a logger instance with the API name as prefix
    this.logger = new Logger({
      prefix: name,
    });
    
    // Create a DBClient instance if exist dbUrl 
    if(dbUrl)
    this.dbClient = new DBClient({
      datasources: {
        db: { url: dbUrl },
      },
    });
    

    // Create an empty array to store the routers
    this.routers = [];

    // Log that the API was created
    this.logger.debug("[API CREATED]");
  }

  // Add a router to the API
  addRouter(router: ApiRouter) {
    // Add the router to the list of routers
    this.routers.push(router);
  }

  // Set dbUrl on DBClient and initialize the client
  setDBUrl(dbUrl: string) {
    this.dbClient = new DBClient({
      datasources: {
        db: { url: dbUrl },
      },
    });
  }

  // set config on DBClient and initialize the client
  setDBClient(config: {}) {
    this.dbClient = new DBClient(config);
  }

  // Set up the Oak application
  setupApp() {
    // Create a new Oak application instance
    this.app = new Application();
    // Set the API logger as a state variable in the app
    this.app.state.logger = this.logger;
    
    // Set the API DBClient in the app
    this.app.state.dbClient = this.dbClient;

    // Add CORS middleware to the app
    this.app.use(oakCors());

    // Add each router's routes and allowed methods to the app
    for (const router of this.routers) {
      this.app.use(router.routes());
      this.app.use(router.allowedMethods());
    }

    // Listen for the "listen" event and log when the API starts
    this.app.addEventListener("listen", ({ port, secure }) => {
      const name = this.config.name.toUpperCase();
      this.logger.info(
        `API ${name} started on ${
          secure ? "https://" : "http://"
        }localhost:${port}`,
      );
    });
  }

  // Start listening on the specified port or default port (8000)
  async listen({ port }: { port?: number } = {}) {
    // Set up the Oak application
    this.setupApp();
    // Get the actual port to listen on
    const actualPort = port ?? this.config.port ?? 8000;
    // Start listening on the actual port and return the server instance
    return this.app?.listen({ port: actualPort });
  }
}

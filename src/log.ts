// Import Colors module from the deno standard library and define the ILogger interface
import { Colors } from "../deps.ts";

interface ILogger {
  debug(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
}

// Define the Logger class that implements the ILogger interface
export class Logger implements ILogger {
  private prefix: string;
  private level: number;

  static levels = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };

  // Initialize the logger with a prefix and optional log level
  constructor({
    prefix,
    level = Logger.levels.debug,
  }: {
    prefix: string;
    level?: number;
  }) {
    this.prefix = prefix;
    this.level = level;
  }

  // Log a message with the given level and arguments
  private log(level: string, ...args: any[]) {
    // Define colors for each log level
    const ColorLog: any = {
      debug: Colors.blue,
      info: Colors.green,
      warn: Colors.yellow,
      error: Colors.red,
    };

    // Format the log message with colors and time, level, and prefix labels
    let LOG_TIME = `[${new Date().toISOString()}]`;
    LOG_TIME = Colors.gray(LOG_TIME);
    LOG_TIME = Colors.italic(LOG_TIME);

    let LOG_LEVEL = level.toUpperCase();
    LOG_LEVEL = ColorLog[level](LOG_LEVEL);
    LOG_LEVEL = Colors.bold(LOG_LEVEL);
    LOG_LEVEL = `[${LOG_LEVEL}]`;

    let LOG_PREFIX = this.prefix;
    LOG_PREFIX = Colors.bold(LOG_PREFIX);
    LOG_PREFIX = Colors.bgBlack(LOG_PREFIX);
    LOG_PREFIX = `[${LOG_PREFIX}]`;

    // Apply formatting to each argument
    let logArgs = args.map((arg) => {
      if (typeof arg === "object" && arg !== null) {
        try {
          return JSON.stringify(arg, null, 2);
        } catch (e) {
          return arg;
        }
      } else if (
        typeof arg === "string" &&
        arg.startsWith("[") &&
        arg.endsWith("]")
      ) {
        const innerText: any = arg.slice(1, -1);
        return `[${Colors.bgBlack(innerText.toUpperCase())}]`;
      }
      return arg;
    });

    // Print the formatted log message to the console
    console.log(LOG_TIME, LOG_LEVEL, LOG_PREFIX, ...logArgs);
  }

  // Check if a log level should be logged
  private shouldLog(level: number) {
    return level >= this.level;
  }

  debug(...args: any[]) {
    if (!this.shouldLog(Logger.levels.debug)) return;
    this.log("debug", ...args);
  }

  info(...args: any[]) {
    if (!this.shouldLog(Logger.levels.info)) return;
    this.log("info", ...args);
  }

  warn(...args: any[]) {
    if (!this.shouldLog(Logger.levels.warn)) return;
    this.log("warn", ...args);
  }

  error(...args: any[]) {
    this.log("error", ...args);
  }

  setLevel(level: number) {
    this.level = level;
  }

  setLevelDebug() {
    this.level = Logger.levels.debug;
  }

  setLevelInfo() {
    this.level = Logger.levels.info;
  }

  setLevelWarn() {
    this.level = Logger.levels.warn;
  }

  setLevelError() {
    this.level = Logger.levels.error;
  }

  setPrefix(prefix: string) {
    this.prefix = prefix;
  }
}

export const logger = new Logger({ prefix: "CLAU" });

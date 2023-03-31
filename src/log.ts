import { Colors } from "../deps.ts";

interface ILogger {
  debug(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
}

export type LogLevel = "debug" | "info" | "warn" | "error";
export type LogLevels = {
  [key in LogLevel]: number;
};

export class Logger implements ILogger {
  private prefix: string;
  private level: string;
  private levels: LogLevels = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };

  constructor({
    prefix,
    level = "debug",
  }: {
    prefix: string;
    level?: LogLevel;
  }) {
    this.prefix = prefix;
    this.level = level;
  }

  private log(level: string, ...args: any[]) {
    const ColorLog: any = {
      debug: Colors.blue,
      info: Colors.green,
      warn: Colors.yellow,
      error: Colors.red,
    };

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

    console.log(LOG_TIME, LOG_LEVEL, LOG_PREFIX, ...logArgs);
  }

  private shouldLog(level: LogLevel) {
    return this.levels[level] >= this.levels[this.level as LogLevel];
  }

  debug(...args: any[]) {
    if (!this.shouldLog("debug" as LogLevel)) return;
    this.log("debug", ...args);
  }

  info(...args: any[]) {
    if (!this.shouldLog("info" as LogLevel)) return;
    this.log("info", ...args);
  }

  warn(...args: any[]) {
    if (!this.shouldLog("warn" as LogLevel)) return;
    this.log("warn", ...args);
  }

  error(...args: any[]) {
    this.log("error", ...args);
  }

  setLevel(level: string) {
    this.level = level;
  }

  setLevelDebug() {
    this.level = "debug";
  }

  setLevelInfo() {
    this.level = "info";
  }

  setLevelWarn() {
    this.level = "warn";
  }

  setLevelError() {
    this.level = "error";
  }

  setPrefix(prefix: string) {
    this.prefix = prefix;
  }
}

export const logger = new Logger({ prefix: "CLAU" });

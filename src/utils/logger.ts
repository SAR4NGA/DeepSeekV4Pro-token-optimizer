import chalk from 'chalk';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

let currentLevel = LogLevel.INFO;

export function setLogLevel(level: LogLevel): void {
  currentLevel = level;
}

export function getLogLevel(): LogLevel {
  return currentLevel;
}

export const logger = {
  debug: (msg: string) => {
    if (currentLevel <= LogLevel.DEBUG) {
      process.stderr.write(chalk.gray(`[debug] ${msg}\n`));
    }
  },
  info: (msg: string) => {
    if (currentLevel <= LogLevel.INFO) {
      process.stderr.write(chalk.blue(`[info] ${msg}\n`));
    }
  },
  warn: (msg: string) => {
    if (currentLevel <= LogLevel.WARN) {
      process.stderr.write(chalk.yellow(`[warn] ${msg}\n`));
    }
  },
  error: (msg: string) => {
    if (currentLevel <= LogLevel.ERROR) {
      process.stderr.write(chalk.red(`[error] ${msg}\n`));
    }
  },
  success: (msg: string) => {
    if (currentLevel <= LogLevel.INFO) {
      process.stderr.write(chalk.green(`[success] ${msg}\n`));
    }
  },
};

import { LogLevel } from './constants.js';

export type LogOptions = {
  newLineBefore?: boolean;
  newLineAfter?: boolean;
};

export type PrintLogMessageByLevelProps = {
  logLevel: LogLevel;
  message: string;
  options?: LogOptions;
};

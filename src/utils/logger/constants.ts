import { COLORS } from '../../constants/colors.js';

export enum LogLevel {
  Log = 'log',
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
}

export const LOG_LEVEL_TO_COLOR = {
  [LogLevel.Log]: '',
  [LogLevel.Info]: COLORS.blue,
  [LogLevel.Warn]: COLORS.yellow,
  [LogLevel.Error]: COLORS.red,
};

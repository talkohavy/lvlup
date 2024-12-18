import { COLORS } from '../../constants/colors.js';
import { LOG_LEVEL_TO_COLOR, LogLevel } from './constants.js';
import { LogOptions, PrintLogMessageByLevelProps } from './types.js';

class Logger {
  log(message: string, options?: LogOptions) {
    this.printLogMessageByLevel({ logLevel: LogLevel.Log, message, options });
  }

  info(message: string, options?: LogOptions) {
    this.printLogMessageByLevel({ logLevel: LogLevel.Info, message, options });
  }

  warn(message: string, options?: LogOptions) {
    this.printLogMessageByLevel({ logLevel: LogLevel.Warn, message, options });
  }

  error(message: string, options?: LogOptions) {
    this.printLogMessageByLevel({ logLevel: LogLevel.Error, message, options });
  }

  private printLogMessageByLevel(props: PrintLogMessageByLevelProps) {
    const { logLevel, message, options } = props;

    options?.newLineBefore && console.log('');
    console[logLevel](`🎩  ${LOG_LEVEL_TO_COLOR[logLevel]}${logLevel}${COLORS.stop}`, message);
    options?.newLineAfter && console.log('');
  }
}

export const logger = new Logger();

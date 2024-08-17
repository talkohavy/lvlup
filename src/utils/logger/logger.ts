import { COLORS } from '../../constants/colors.js';

class Logger {
  log(message: string) {
    console.log('🎩', message);
  }

  info(message: string) {
    console.log(`🎩  ${COLORS.blue}info${COLORS.stop}`, message);
  }

  error(message: string) {
    console.log(`🎩  ${COLORS.red}error${COLORS.stop}`, message);
  }
}

const logger = new Logger();

export { logger };

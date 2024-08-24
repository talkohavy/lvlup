import fs from 'fs';
import os from 'os';
import { COLORS } from '../../constants/colors.js';
import { LVLUP_DIR_NAME, LVLUP_DIR_PATH, LVLUP_TOOL_NAME_COLORED } from '../../constants/globals.js';
import { isRootLvlupDirExists } from '../../utils/isRootLvlupDirExists.js';
import { logger } from '../../utils/logger/logger.js';

async function init() {
  try {
    if (isRootLvlupDirExists()) {
      logger.warn(
        `Looks like you've already initialized ${LVLUP_TOOL_NAME_COLORED}. You should be able to run ${LVLUP_TOOL_NAME_COLORED} commands without a problems.`,
      );

      process.exit(0);
    }

    fs.mkdirSync(LVLUP_DIR_PATH, { recursive: true });

    logger.info(
      `Thanks for choosing ${LVLUP_TOOL_NAME_COLORED} to help manage your versioning and publishing${os.EOL}`,
    );

    logger.info(`You should be able to start using ${LVLUP_TOOL_NAME_COLORED} now!${os.EOL}`);
    logger.info(`info We have added a '${LVLUP_DIR_NAME}' folder, and a couple of files to help you out:`);
    logger.info(
      `- ${COLORS.blue}${LVLUP_DIR_NAME}/README.md${COLORS.stop} contains information about using ${LVLUP_TOOL_NAME_COLORED}`,
    );
    logger.info(`${COLORS.blue}- ${LVLUP_DIR_NAME}/config.json is our default config`);
  } catch (_error: any) {
    console.log(`${os.EOL}${COLORS.red}Bye.${os.EOL}`);
  }
}

export { init };

import fs from 'fs';
import path from 'path';
import { LVLUP_DIR_NAME, LVLUP_TOOL_NAME } from '@src/constants/globals.js';
import { logger } from './logger/index.js';

function validateRootLvlupExists() {
  if (!fs.existsSync(path.resolve(process.cwd(), LVLUP_DIR_NAME))) {
    logger.error(`There is no ${LVLUP_DIR_NAME} folder.`);

    logger.error(
      `If this is the first time '${LVLUP_TOOL_NAME}' have been used in this project, run 'yarn ${LVLUP_TOOL_NAME} init' to get set up.`,
    );

    logger.error(
      `If you expected there to be a ${LVLUP_DIR_NAME}, you should check git history for when the folder was removed to ensure you do not lose any configuration.`,
    );

    throw new Error(`${LVLUP_DIR_NAME} directory doesn't exists`);
  }
}

export { validateRootLvlupExists };

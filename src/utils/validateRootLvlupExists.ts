import { LVLUP_DIR_NAME, LVLUP_TOOL_NAME_COLORED } from '../constants/globals.js';
import { isRootLvlupDirExists } from './isRootLvlupDirExists.js';
import { logger } from './logger/index.js';

function validateRootLvlupExists() {
  if (!isRootLvlupDirExists()) {
    logger.error(`There is no ${LVLUP_DIR_NAME} folder.`);

    logger.error(
      `If this is the first time '${LVLUP_TOOL_NAME_COLORED}' have been used in this project, run 'yarn ${LVLUP_TOOL_NAME_COLORED} init' to get set up.`,
    );

    logger.error(
      `If you expected there to be a ${LVLUP_DIR_NAME}, you should check git history for when the folder was removed to ensure you do not lose any configuration.`,
    );

    throw new Error(`${LVLUP_DIR_NAME} directory doesn't exists`);
  }
}

export { validateRootLvlupExists };

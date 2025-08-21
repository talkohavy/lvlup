import { CLI_TOOL_DIR_NAME, CLI_TOOL_NAME_COLORED } from '../constants/globals.js';
import { isRootLvlupDirExists } from './isRootLvlupDirExists.js';
import { logger } from '../../lib/logger/logger.js';

export function validateRootLvlupExists() {
  if (!isRootLvlupDirExists()) {
    logger.error(`There is no ${CLI_TOOL_DIR_NAME} folder.`);

    logger.error(
      `If this is the first time '${CLI_TOOL_NAME_COLORED}' have been used in this project, run 'yarn ${CLI_TOOL_NAME_COLORED} init' to get set up.`,
    );

    logger.error(
      `If you expected there to be a ${CLI_TOOL_DIR_NAME}, you should check git history for when the folder was removed to ensure you do not lose any configuration.`,
    );

    throw new Error(`${CLI_TOOL_DIR_NAME} directory doesn't exists`);
  }
}

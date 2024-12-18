import os from 'os';
import { COLORS } from '../../common/constants/colors.js';
import { CLI_TOOL_DIR_NAME, CLI_TOOL_NAME_COLORED } from '../../common/constants/globals.js';
import { isRootLvlupDirExists } from '../../common/utils/isRootLvlupDirExists.js';
import { logger } from '../../common/utils/logger/logger.js';
import { createConfigJsonFile } from './helpers/createConfigJsonFile.js';
import { createLvlUpBaseDir } from './helpers/createLvlUpBaseDir.js';
import { createReadmeMeFile } from './helpers/createReadmeMdFile.js';

export const initCommandString = 'init';
export const initCommandDescription = 'To start using lvlup, you first need to run the init command.';

type InitProps = any;

export async function init(_props?: InitProps) {
  if (isRootLvlupDirExists()) {
    logger.warn(
      `Looks like you've already initialized ${CLI_TOOL_NAME_COLORED}. You should be able to run ${CLI_TOOL_NAME_COLORED} commands without a problems.`,
    );
    process.exit(0);
  }

  createLvlUpBaseDir();
  createConfigJsonFile();
  createReadmeMeFile();

  logger.info(`Thanks for choosing ${CLI_TOOL_NAME_COLORED} to help manage your versioning and publishing${os.EOL}`);
  logger.info(`You should be able to start using ${CLI_TOOL_NAME_COLORED} now!${os.EOL}`);
  logger.info(`info We have added a '${CLI_TOOL_DIR_NAME}' folder, and a couple of files to help you out:`);
  logger.info(
    `- ${COLORS.blue}${CLI_TOOL_DIR_NAME}/README.md${COLORS.stop} contains information about using ${CLI_TOOL_NAME_COLORED}`,
  );
  logger.info(`- ${COLORS.blue}${CLI_TOOL_DIR_NAME}/config.json${COLORS.stop} is our default config`);
}

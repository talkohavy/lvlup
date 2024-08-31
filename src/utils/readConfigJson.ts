import fs from 'fs/promises';
import path from 'path';
import { LVLUP_DIR_PATH, LVLUP_TOOL_NAME_COLORED } from '../constants/globals.js';
import { ConfigJson } from '../constants/types.js';
import { logger } from './logger/logger.js';

type ReadPackageJsonReturnValue = Promise<{
  configJsonAsObject: ConfigJson;
}>;

async function readConfigJson(): ReadPackageJsonReturnValue {
  try {
    const configJsonPath = path.resolve(LVLUP_DIR_PATH, 'config.json');

    const configJsonAsString = (await fs.readFile(configJsonPath)).toString();

    const configJsonAsObject = JSON.parse(configJsonAsString);

    return { configJsonAsObject };
  } catch (error) {
    logger.error(`Failed to read ${LVLUP_TOOL_NAME_COLORED}'s config.json file...`);

    throw error;
  }
}

export { readConfigJson };

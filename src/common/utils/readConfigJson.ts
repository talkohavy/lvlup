import fs from 'fs/promises';
import path from 'path';
import { CLI_TOOL_DIR_PATH, CLI_TOOL_NAME_COLORED } from '../constants/globals.js';
import { ConfigJson } from '../types.js';
import { logger } from '../../lib/logger/logger.js';

type ReadPackageJsonReturnValue = Promise<{
  configJsonAsObject: ConfigJson;
}>;

export async function readConfigJson(): ReadPackageJsonReturnValue {
  try {
    const configJsonPath = path.resolve(CLI_TOOL_DIR_PATH, 'config.json');

    const configJsonAsString = (await fs.readFile(configJsonPath)).toString();

    const configJsonAsObject = JSON.parse(configJsonAsString);

    return { configJsonAsObject };
  } catch (error) {
    logger.error(`Failed to read ${CLI_TOOL_NAME_COLORED}'s config.json file...`);

    throw error;
  }
}

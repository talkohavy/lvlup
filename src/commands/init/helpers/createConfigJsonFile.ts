import fs from 'fs';
import path from 'path';
import { LVLUP_DIR_PATH } from '../../../constants/globals.js';
import { DEFAULT_CONFIG_JSON } from '../constants.js';

function createConfigJsonFile() {
  const configJsonPath = path.resolve(LVLUP_DIR_PATH, 'config.json');

  fs.writeFileSync(configJsonPath, DEFAULT_CONFIG_JSON);
}

export { createConfigJsonFile };

import fs from 'fs';
import { CLI_TOOL_DIR_PATH } from '../../../common/constants/globals.js';

export function createLvlUpBaseDir() {
  fs.mkdirSync(CLI_TOOL_DIR_PATH, { recursive: true });
}

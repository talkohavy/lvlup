import fs from 'fs';
import path from 'path';
import { CLI_TOOL_DIR_NAME } from '../constants/globals.js';

export function isRootLvlupDirExists() {
  const isExists = fs.existsSync(path.resolve(process.cwd(), CLI_TOOL_DIR_NAME));

  return isExists;
}

import fs from 'fs';
import path from 'path';
import { LVLUP_DIR_NAME } from '../constants/globals.js';

function isRootLvlupDirExists() {
  const isExists = fs.existsSync(path.resolve(process.cwd(), LVLUP_DIR_NAME));

  return isExists;
}

export { isRootLvlupDirExists };

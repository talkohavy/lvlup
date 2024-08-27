import fs from 'fs';
import path from 'path';
import { LVLUP_DIR_PATH } from '../../../constants/globals.js';
import { DEFAULT_README_MD } from '../constants.js';

function createReadmeMeFile() {
  const readmeMdPath = path.resolve(LVLUP_DIR_PATH, 'README.md');

  fs.writeFileSync(readmeMdPath, DEFAULT_README_MD);
}

export { createReadmeMeFile };

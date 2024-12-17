import fs from 'fs';
import { LVLUP_DIR_PATH } from '../../../common/constants/globals.js';

function createLvlUpBaseDir() {
  fs.mkdirSync(LVLUP_DIR_PATH, { recursive: true });
}

export { createLvlUpBaseDir };

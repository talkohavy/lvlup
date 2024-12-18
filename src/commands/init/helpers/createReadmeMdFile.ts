import fs from 'fs';
import path from 'path';
import { LVLUP_DIR_PATH } from '../../../common/constants/globals.js';

export function createReadmeMeFile() {
  const { dirname } = import.meta;

  const readmeMdSourcePath = path.resolve(dirname, 'default.README.md');
  const readmeMdDestinationPath = path.resolve(LVLUP_DIR_PATH, 'README.md');

  const readStream = fs.createReadStream(readmeMdSourcePath);
  const writeStream = fs.createWriteStream(readmeMdDestinationPath);

  readStream.pipe(writeStream);
}

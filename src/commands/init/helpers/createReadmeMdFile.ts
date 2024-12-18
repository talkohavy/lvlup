import fs from 'fs';
import path from 'path';
import { LVLUP_DIR_PATH } from '../../../common/constants/globals.js';

const { dirname: __dirname } = import.meta;

export function createReadmeMeFile() {
  const readmeMdSourcePath = path.resolve(__dirname, 'default.README.md');
  const readmeMdDestinationPath = path.resolve(LVLUP_DIR_PATH, 'README.md');

  const readStream = fs.createReadStream(readmeMdSourcePath);
  const writeStream = fs.createWriteStream(readmeMdDestinationPath);

  readStream.pipe(writeStream);
}

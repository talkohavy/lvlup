import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { LVLUP_DIR_PATH } from '../../../common/constants/globals.js';

const filename = import.meta.url && fileURLToPath(import.meta.url);
const dirname = import.meta.url ? path.dirname(filename) : __dirname;

export function createReadmeMeFile() {
  const readmeMdSourcePath = path.resolve(dirname, 'default.README.md');
  const readmeMdDestinationPath = path.resolve(LVLUP_DIR_PATH, 'README.md');

  const readStream = fs.createReadStream(readmeMdSourcePath);
  const writeStream = fs.createWriteStream(readmeMdDestinationPath);

  readStream.pipe(writeStream);
}

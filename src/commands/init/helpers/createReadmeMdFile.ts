import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { LVLUP_DIR_PATH } from '../../../constants/globals.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createReadmeMeFile() {
  const readmeMdSourcePath = path.resolve(__dirname, '..', '..', '..', 'default.README.md');
  const readmeMdDestinationPath = path.resolve(LVLUP_DIR_PATH, 'README.md');

  const readStream = fs.createReadStream(readmeMdSourcePath);
  const writeStream = fs.createWriteStream(readmeMdDestinationPath);

  readStream.pipe(writeStream);
}

export { createReadmeMeFile };

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { LVLUP_DIR_PATH } from '../../../constants/globals.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createConfigJsonFile() {
  const configJsonSourcePath = path.resolve(__dirname, '..', '..', '..', 'default.config.json');
  const configJsonDestinationPath = path.resolve(LVLUP_DIR_PATH, 'config.json');

  const readStream = fs.createReadStream(configJsonSourcePath);
  const writeStream = fs.createWriteStream(configJsonDestinationPath);

  readStream.pipe(writeStream);
}

export { createConfigJsonFile };

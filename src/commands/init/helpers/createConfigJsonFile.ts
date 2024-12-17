import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { LVLUP_DIR_PATH } from '../../../common/constants/globals.js';

const filename = import.meta.url && fileURLToPath(import.meta.url);
const dirname = import.meta.url ? path.dirname(filename) : __dirname;

export function createConfigJsonFile() {
  const configJsonSourcePath = path.resolve(dirname, 'default.config.json');
  const configJsonDestinationPath = path.resolve(LVLUP_DIR_PATH, 'config.json');

  const readStream = fs.createReadStream(configJsonSourcePath);
  const writeStream = fs.createWriteStream(configJsonDestinationPath);

  readStream.pipe(writeStream);
}

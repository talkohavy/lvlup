import fs from 'fs';
import path from 'path';
import { CLI_TOOL_DIR_PATH } from '../../../common/constants/globals.js';

export function createConfigJsonFile() {
  const { dirname } = import.meta;

  const configJsonSourcePath = path.resolve(dirname, 'default.config.json');
  const configJsonDestinationPath = path.resolve(CLI_TOOL_DIR_PATH, 'config.json');

  const readStream = fs.createReadStream(configJsonSourcePath);
  const writeStream = fs.createWriteStream(configJsonDestinationPath);

  readStream.pipe(writeStream);
}

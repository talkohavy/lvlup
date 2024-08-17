import fs from 'fs';
import path from 'path';
import { logger } from './logger/index.js';

function validateRootPvmExists() {
  if (!fs.existsSync(path.resolve(process.cwd(), '.pvm'))) {
    logger.error('There is no .pvm folder.');

    logger.error('If this is the first time `pvm` have been used in this project, run `yarn pvm init` to get set up.');

    logger.error(
      'If you expected there to be pvm, you should check git history for when the folder was removed to ensure you do not lose any configuration.',
    );

    throw new Error(".pvm directory doesn't exists");
  }
}

export { validateRootPvmExists };

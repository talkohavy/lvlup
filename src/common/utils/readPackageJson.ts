import fs from 'fs/promises';
import path from 'path';
import type { PackageJson } from '../types.js';
import { logger } from '../../lib/logger/logger.js';
import { PROJECT_ROOT } from '../constants/globals.js';

type ReadPackageJsonReturnValue = Promise<{
  packageJsonAsString: string;
  packageJsonAsObject: PackageJson;
}>;

async function readPackageJson(): ReadPackageJsonReturnValue {
  try {
    const packageJsonPath = path.resolve(PROJECT_ROOT, 'package.json');

    const packageJsonAsString = (await fs.readFile(packageJsonPath)).toString();

    const packageJsonAsObject = JSON.parse(packageJsonAsString);

    return { packageJsonAsObject, packageJsonAsString };
  } catch (error) {
    logger.error("Failed to read the project's package.json file...");

    throw error;
  }
}

export { readPackageJson };

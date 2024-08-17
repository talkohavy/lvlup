import fs from 'fs/promises';
import path from 'path';
import { PROJECT_ROOT } from '../../../constants/globals.js';
import { PackageJson, VersionObject } from '../../../constants/types.js';
import { logger } from '../../../utils/logger/logger.js';

type ReadPackageJsonReturnValue = Promise<{
  name: string;
  version: VersionObject;
}>;

async function readPackageJson(): ReadPackageJsonReturnValue {
  try {
    const packageJsonPath = path.resolve(PROJECT_ROOT, 'package.json');

    const packageJsonString = (await fs.readFile(packageJsonPath)).toString();

    const packageJson = JSON.parse(packageJsonString);

    const parsedPackageJson = validatePackageJson(packageJson);

    return { name: parsedPackageJson.name, version: parsedPackageJson.version };
  } catch (error) {
    logger.error("Failed to read the project's package.json file...");

    throw error;
  }
}

function validatePackageJson(packageJson: PackageJson) {
  const [major, minor, patch] = packageJson.version.split('.').map(Number) as [number, number, number];

  if (!(Number.isInteger(major) && Number.isInteger(minor) && Number.isInteger(patch))) {
    logger.error('The version listed under your package.json is corrupted! Expected to see <number>.<number>.<number>');

    throw new Error('The value for `version` listed under your package.json is invalid... please fix it and try again');
  }

  const updatedPackageJson = { ...packageJson, version: { major, minor, patch } as VersionObject };

  return updatedPackageJson;
}

export { readPackageJson };

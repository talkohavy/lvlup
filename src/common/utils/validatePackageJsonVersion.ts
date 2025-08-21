import { VersionObject } from '../types.js';
import { logger } from '../../lib/logger/logger.js';

export function validatePackageJsonVersion(version: string): VersionObject {
  const [major, minor, patch] = version.split('.').map(Number) as [number, number, number];

  if (!(Number.isInteger(major) && Number.isInteger(minor) && Number.isInteger(patch))) {
    logger.error('The version listed under your package.json is corrupted! Expected to see <number>.<number>.<number>');

    throw new Error('The value for `version` listed under your package.json is invalid... please fix it and try again');
  }

  return { major, minor, patch };
}

import { execSync } from 'child_process';
import { readPackageJson } from '../../common/utils/readPackageJson.js';
import { logger } from '../../lib/logger/logger.js';

export const publishCommandString = 'publish';
export const publishCommandDescription =
  'publishes the package to your designated registry using the rules you specified.';

type PublishProps = any;

export async function publish(_props?: PublishProps) {
  const { packageJsonAsObject } = await readPackageJson();

  const { private: isPrivate, publishConfig } = packageJsonAsObject;

  if (isPrivate) return logger.warn('CANNOT publish a package that is private!');

  const addedFlag = publishConfig.access === 'public' ? '--access=public' : '';

  execSync(`npm publish ${addedFlag}`);
}

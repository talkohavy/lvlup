import { execSync } from 'child_process';
import os from 'os';
import { COLORS } from '../../constants/colors.js';
import { logger } from '../../utils/logger/logger.js';
import { readPackageJson } from '../../utils/readPackageJson.js';

type PublishProps = any;

async function publish(_props?: PublishProps) {
  try {
    const { packageJsonAsObject } = await readPackageJson();

    const { private: isPrivate, publishConfig } = packageJsonAsObject;

    if (isPrivate) return logger.warn('CANNOT publish a package that is private!');

    const addedFlag = publishConfig.access === 'public' ? '--access=public' : '';

    execSync(`npm publish ${addedFlag}`);
  } catch (_error: any) {
    console.log(`${os.EOL}${COLORS.red}Bye.${os.EOL}`);
  }
}

export { publish };

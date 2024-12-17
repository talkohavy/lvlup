import { execSync } from 'child_process';
import os from 'os';
import { COLORS } from '../../common/constants/colors.js';
import { logger } from '../../common/utils/logger/logger.js';
import { readPackageJson } from '../../common/utils/readPackageJson.js';

type PublishProps = any;

export async function publish(_props?: PublishProps) {
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

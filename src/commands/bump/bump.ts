import path from 'path';
import { globSync } from 'glob';
import { PVM_BASE_PATH, PVM_DIR_NAME } from '../../constants/globals.js';
import { logger } from '../../utils/logger/logger.js';
import { readPackageJson } from '../../utils/readPackageJson.js';
import { validatePackageJsonVersion } from '../../utils/validatePackageJsonVersion.js';
import { calculateNextVersion } from './helpers/calculateNextVersion.js';
import { deleteUsedMdFiles } from './helpers/deleteUsedMdFiles.js';
import { updateVersionInPackageJson } from './helpers/updateVersionInPackageJson.js';

async function bump() {
  const { packageJsonAsObject, packageJsonAsString } = await readPackageJson();

  const { name: currentPackageName, version: prevVersion } = packageJsonAsObject;

  const currentVersionParsed = validatePackageJsonVersion(prevVersion);

  const mdVersionFiles = globSync(`${PVM_DIR_NAME}/*.md`).map((file) => {
    const filenameWithExtension = file.replace(`${PVM_DIR_NAME}/`, '');
    const filenameFullPath = path.resolve(PVM_BASE_PATH, filenameWithExtension);
    return filenameFullPath;
  });

  if (!mdVersionFiles.length) return logger.warn('No unreleased changesets found, exiting.');

  const nextVersion = await calculateNextVersion({
    currentVersion: currentVersionParsed,
    currentPackageName,
    mdVersionFiles,
  });

  logger.info(`New version calculated: ${nextVersion}`);

  await updateVersionInPackageJson({ nextVersion, prevVersion, packageJsonAsString });

  await deleteUsedMdFiles({ mdVersionFiles });

  return nextVersion;
}

bump();

export { bump };

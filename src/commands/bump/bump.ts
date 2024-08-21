import { COLORS } from '../../constants/colors.js';
import { logger } from '../../utils/logger/logger.js';
import { readPackageJson } from '../../utils/readPackageJson.js';
import { validatePackageJsonVersion } from '../../utils/validatePackageJsonVersion.js';
import { calculateNextVersionByChanges } from './helpers/calculateNextVersionFor.js';
import { commitBumpChanges } from './helpers/commitBumpChanges.js';
import { deleteUsedMdFiles } from './helpers/deleteUsedMdFiles.js';
import { extractChangesByPackageName } from './helpers/ExtractChangesByPackageNameProps.js';
import { getAllMdVersionFiles } from './helpers/getMdVersionFilesByPackageName.js';
import { isZeroChanges } from './helpers/isZeroChanges.js';
import { updateTheChangelog } from './helpers/updateTheChangelog.js';
import { updateVersionInPackageJson } from './helpers/updateVersionInPackageJson.js';

async function bump() {
  try {
    const { packageJsonAsObject, packageJsonAsString } = await readPackageJson();

    const { name: packageName, version: prevVersion } = packageJsonAsObject;

    const currentVersionParsed = validatePackageJsonVersion(prevVersion);

    const mdVersionFilePaths = getAllMdVersionFiles();

    const changes = await extractChangesByPackageName({ packageName, mdVersionFilePaths });

    if (isZeroChanges(changes)) return logger.warn('No unreleased changesets found, exiting.');

    const nextVersion = await calculateNextVersionByChanges({ changes, currentVersion: currentVersionParsed });

    logger.info(`New package version: ${nextVersion}`);

    await updateVersionInPackageJson({ packageJsonAsString, prevVersion, nextVersion });

    await deleteUsedMdFiles({ mdVersionFilePaths });

    await updateTheChangelog({ packageName, nextVersion, changes });

    await commitBumpChanges({ mdVersionFilePaths });

    logger.info('All files have been updated and committed. You are ready to publish!');
  } catch (error) {
    logger.info('Something went wrong...');

    console.error(error);

    console.log(`\n${COLORS.red}Existed.\n`);
  }
}

bump();

export { bump };

import os from 'os';
import { COLORS } from '../../constants/colors.js';
import { extractChangesByPackageName } from '../../utils/ExtractChangesByPackageName.js';
import { getAllMdVersionFiles } from '../../utils/getMdVersionFilesByPackageName.js';
import { isZeroChanges } from '../../utils/isZeroChanges.js';
import { logger } from '../../utils/logger/logger.js';
import { readConfigJson } from '../../utils/readConfigJson.js';
import { readPackageJson } from '../../utils/readPackageJson.js';
import { validatePackageJsonVersion } from '../../utils/validatePackageJsonVersion.js';
import {
  calculateNextVersionByChanges,
  commitBumpChanges,
  deleteUsedMdFiles,
  updateTheChangelog,
  updateVersionInPackageJson,
} from './helpers/index.js';

type BumpProps = any;

async function bump(_props?: BumpProps) {
  try {
    const { packageJsonAsObject, packageJsonAsString } = await readPackageJson();
    const { name: packageName, version: prevVersion } = packageJsonAsObject;
    const currentVersionParsed = validatePackageJsonVersion(prevVersion);

    const { configJsonAsObject } = await readConfigJson();
    const { afterBump: shouldCommitAfterBump } = configJsonAsObject.commit ?? {};

    const mdVersionFilePaths = await getAllMdVersionFiles();

    const changes = await extractChangesByPackageName({ packageName, mdVersionFilePaths });

    if (isZeroChanges(changes)) return logger.warn('No unreleased changes found, exiting.');

    const nextVersion = await calculateNextVersionByChanges({ changes, currentVersion: currentVersionParsed });

    logger.info(`New package version: ${COLORS.yellow}${nextVersion}${COLORS.stop}`);

    await updateVersionInPackageJson({ packageJsonAsString, prevVersion, nextVersion });

    await deleteUsedMdFiles({ mdVersionFilePaths });

    await updateTheChangelog({ packageName, nextVersion, changes });

    if (shouldCommitAfterBump) {
      await commitBumpChanges({ mdVersionFilePaths, version: nextVersion });
      logger.info("✅  LVLUP - All files have been updated and committed. You're ready to publish!", {
        newLineBefore: true,
        newLineAfter: true,
      });
    } else {
      logger.info(
        "✅  LVLUP - All files have been updated but not yet committed. Please review them, commit them, and then you'll be ready to publish.",
        {
          newLineBefore: true,
          newLineAfter: true,
        },
      );
    }
  } catch (error) {
    logger.error('Something went wrong...');

    console.error(error);

    console.log(`${os.EOL}${COLORS.red}Existed.${os.EOL}`);
  }
}

export { bump };

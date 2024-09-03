import os from 'os';
import path from 'path';
import { COLORS } from '../../constants/colors.js';
import { SemverLevels } from '../../constants/enums.js';
import { extractChangesByPackageName } from '../../utils/ExtractChangesByPackageName.js';
import { getAllMdVersionFiles } from '../../utils/getMdVersionFilesByPackageName.js';
import { isZeroChanges } from '../../utils/isZeroChanges.js';
import { logger } from '../../utils/logger/logger.js';
import { readPackageJson } from '../../utils/readPackageJson.js';
import { printStatusTable } from './helpers/printStatusTable.js';

type StatusProps = any;

async function status(_props?: StatusProps) {
  try {
    const { packageJsonAsObject } = await readPackageJson();

    const { name: packageName } = packageJsonAsObject;

    const mdVersionFilePaths = await getAllMdVersionFiles();

    const changes = await extractChangesByPackageName({ packageName, mdVersionFilePaths });

    const changesAsTable: Array<any> = [];

    for (const key in changes) {
      changes[key as SemverLevels].forEach((changeItem) => {
        const trimmedDescription = `${changeItem.description.substring(0, 50)}...`;

        const cell = {
          Filename: path.basename(changeItem.filename),
          Level: changeItem.level,
          Description: trimmedDescription,
        };

        changesAsTable.push(cell);
      });
    }

    if (isZeroChanges(changes)) return logger.info('0 changes found. You are up-to-date');

    printStatusTable(changesAsTable);
  } catch (_error: any) {
    console.log(`${os.EOL}${COLORS.red}Bye.${os.EOL}`);
  }
}

export { status };

import os from 'os';
import { COLORS } from '../../constants/colors.js';
import { extractChangesByPackageName } from '../../utils/ExtractChangesByPackageName.js';
import { getAllMdVersionFiles } from '../../utils/getMdVersionFilesByPackageName.js';
import { isZeroChanges } from '../../utils/isZeroChanges.js';
import { logger } from '../../utils/logger/logger.js';
import { readPackageJson } from '../../utils/readPackageJson.js';
import { prettyPrintStatusTable } from './helpers/prettyPrintStatusTable.js';
import { printWordStatus } from './helpers/printWordStatus.js';

type StatusProps = any;

async function status(_props?: StatusProps) {
  try {
    const { packageJsonAsObject } = await readPackageJson();

    const { name: packageName } = packageJsonAsObject;

    const mdVersionFilePaths = await getAllMdVersionFiles();

    const changes = await extractChangesByPackageName({ packageName, mdVersionFilePaths });

    const changesAsTable: Array<any> = [...changes.major, ...changes.minor, ...changes.patch];

    if (isZeroChanges(changes)) return logger.info('0 changes found. You are up-to-date');

    printWordStatus();
    prettyPrintStatusTable(changesAsTable);
  } catch (_error: any) {
    console.log(`${os.EOL}${COLORS.red}Bye.${os.EOL}`);
  }
}

export { status };

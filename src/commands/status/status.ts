import { extractChangesByPackageName } from '../../common/utils/extractChangesByPkgName.js';
import { getAllMdVersionFiles } from '../../common/utils/getMdVersionFilesByPackageName.js';
import { isZeroChanges } from '../../common/utils/isZeroChanges.js';
import { readPackageJson } from '../../common/utils/readPackageJson.js';
import { logger } from '../../lib/logger/logger.js';
import { prettyPrintStatusTable } from './helpers/prettyPrintStatusTable.js';
import { printWordStatus } from './helpers/printWordStatus.js';

export const statusCommandString = 'status';
export const statusCommandDescription = "Show the status before bumping the package's version";

type StatusProps = any;

export async function status(_props?: StatusProps) {
  const { packageJsonAsObject } = await readPackageJson();

  const { name: packageName } = packageJsonAsObject;

  const mdVersionFilePaths = await getAllMdVersionFiles();

  const changes = await extractChangesByPackageName({ packageName, mdVersionFilePaths });

  const changesAsTable: Array<any> = [...changes.major, ...changes.minor, ...changes.patch];

  if (isZeroChanges(changes)) return logger.info('0 changes found. You are up-to-date');

  printWordStatus();
  prettyPrintStatusTable(changesAsTable);
}

import fs from 'fs';
import path from 'path';
import { humanId } from 'human-id';
import { CLI_TOOL_DIR_PATH, type SemverLevelValues } from '@src/common/constants';
import { convertLFToCLRF } from '@src/common/utils/convertLFToCLRF';
import { isWindows } from '@src/common/utils/isWindows';
import { logger } from '@src/lib/logger/logger';
import { mdVersionFileTemplate } from './constants';

type inquireSemverProps = {
  packageName: string;
  semverLevel: SemverLevelValues;
  commitMessage: string;
};

export async function createNewMdFile(props: inquireSemverProps) {
  let filenameWithExtension = 'no-name';

  try {
    const { packageName, semverLevel, commitMessage } = props;

    const filename = humanId({ separator: '-', capitalize: false });
    filenameWithExtension = `${filename}.md`;

    const newMdContents = mdVersionFileTemplate
      .replace('{{packageName}}', packageName)
      .replace('{{semverLevel}}', semverLevel)
      .replace('{{commitMessage}}', commitMessage);

    const correctedMdContents = isWindows() ? convertLFToCLRF(newMdContents) : newMdContents;

    const filenameFullPath = path.resolve(CLI_TOOL_DIR_PATH, filenameWithExtension);

    fs.writeFileSync(filenameFullPath, correctedMdContents);

    return filenameFullPath;
  } catch (error) {
    logger.error(`Failed to create file '${filenameWithExtension}'...`);

    throw error;
  }
}

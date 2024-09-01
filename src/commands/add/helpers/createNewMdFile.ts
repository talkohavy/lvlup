import fs from 'fs';
import path from 'path';
import { humanId } from 'human-id';
import { SemverLevels } from '../../../constants/enums.js';
import { LVLUP_DIR_PATH } from '../../../constants/globals.js';
import { convertLFToCLRF } from '../../../utils/convertLFToCLRF.js';
import { isWindows } from '../../../utils/isWindows.js';
import { logger } from '../../../utils/logger/logger.js';
import { mdVersionFileTemplate } from './constants.js';

type inquireSemverProps = {
  packageName: string;
  semverLevel: SemverLevels;
  commitMessage: string;
};

async function createNewMdFile(props: inquireSemverProps) {
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

    const filenameFullPath = path.resolve(LVLUP_DIR_PATH, filenameWithExtension);

    fs.writeFileSync(filenameFullPath, correctedMdContents);

    return filenameFullPath;
  } catch (error) {
    logger.error(`Failed to create file '${filenameWithExtension}'...`);

    throw error;
  }
}

export { createNewMdFile };

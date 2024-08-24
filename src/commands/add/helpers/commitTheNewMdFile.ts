import { execSync } from 'child_process';
import path from 'path';
import { COLORS } from '../../../constants/colors.js';
import { LVLUP_DIR_PATH } from '../../../constants/globals.js';
import { logger } from '../../../utils/logger/logger.js';

type inquireSemverProps = {
  filenameWithExtension: string;
  commitMessage: string;
};

async function commitTheNewMdFile(props: inquireSemverProps) {
  const filenameWithExtension = 'no-name';

  try {
    const { filenameWithExtension, commitMessage } = props;

    const filenameFullPath = path.resolve(LVLUP_DIR_PATH, filenameWithExtension);
    const escapedCommitMessage = commitMessage.replace(/"/g, '\\"');

    execSync(`git add ${filenameFullPath}`);
    execSync(`git commit -m "docs(lvlup): ${escapedCommitMessage}"`);

    console.log('');
    logger.info('✅  LVLUP changes added and committed');
    logger.info("✅  If you want to modify or expand on the change's summary, you can find it here");
    logger.info(`✅  ${COLORS.yellow}${filenameFullPath}`);
    console.log('');
  } catch (error) {
    logger.error(`[Git Error] Failed to commit the file '${filenameWithExtension}'...`);

    throw error;
  }
}

export { commitTheNewMdFile };

import { execSync } from 'child_process';
import { PVM_BASE_PATH } from '../../../constants/globals.js';
import { logger } from '../../../utils/logger/logger.js';

type inquireSemverProps = {
  filenameWithExtension: string;
  commitMessage: string;
};

async function commitTheNewMdFile(props: inquireSemverProps) {
  const filenameWithExtension = 'no-name';

  try {
    const { filenameWithExtension, commitMessage } = props;

    execSync(`git add ${PVM_BASE_PATH}/${filenameWithExtension}`);
    execSync(`git commit -m 'docs(pvm): ${commitMessage}'`);

    console.log('');
    logger.info('✅  PVM changes added and committed');
    logger.info("✅  If you want to modify or expand on the change's summary, you can find it here");
    logger.info(`✅  ${PVM_BASE_PATH}/${filenameWithExtension}`);
    console.log('');
  } catch (error) {
    logger.error(`[Git Error] Failed to commit the file '${filenameWithExtension}'...`);

    throw error;
  }
}

export { commitTheNewMdFile };

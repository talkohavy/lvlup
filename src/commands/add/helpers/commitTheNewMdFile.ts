import { execSync } from 'child_process';
import { logger } from '../../../common/utils/logger/logger.js';

type inquireSemverProps = {
  filenameFullPath: string;
  commitMessage: string;
};

export async function commitTheNewMdFile(props: inquireSemverProps) {
  const logMetadata = { filenameFullPath: 'no-name' };

  try {
    const { filenameFullPath, commitMessage } = props;
    logMetadata.filenameFullPath = filenameFullPath;

    const escapedCommitMessage = commitMessage.replace(/"/g, '\\"').replace(/`/g, '\\`');

    execSync(`git add ${filenameFullPath}`);
    execSync(`git commit -m "docs(lvlup): ${escapedCommitMessage}"`);
  } catch (error) {
    logger.error(`[Git Error] Failed to commit the file '${logMetadata.filenameFullPath}'...`);

    throw error;
  }
}

import { execSync } from 'child_process';
import { COLORS } from '../../../constants/colors.js';
import { logger } from '../../../utils/logger/logger.js';

type CommitBumpChangesProps = {
  mdVersionFilePaths: Array<string>;
};

async function commitBumpChanges(props: CommitBumpChangesProps) {
  const { mdVersionFilePaths } = props;

  mdVersionFilePaths.forEach((mdVersionFileAbsolutePath) => {
    try {
      execSync(`git add ${mdVersionFileAbsolutePath}`);
    } catch (_error) {
      logger.warn(
        `WARNING! 'git add' operation failed. Detected an md version file which probably was not committed. Path to file was: ${COLORS.yellow}${mdVersionFileAbsolutePath}`,
      );
    }
  });
  execSync('git add package.json');
  execSync('git add CHANGELOG.md');
  execSync("git commit -m 'RELEASING: Releasing 1 package");

  console.log('');
  logger.info("✅  PVM - All files have been updated and committed. You're ready to publish!");
  console.log('');
}

export { commitBumpChanges };

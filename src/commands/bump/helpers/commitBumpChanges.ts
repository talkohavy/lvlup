import { execSync } from 'child_process';
import { logger } from '../../../utils/logger/logger.js';

type CommitBumpChangesProps = {
  mdVersionFiles: Array<string>;
};

function commitBumpChanges(props: CommitBumpChangesProps) {
  const { mdVersionFiles } = props;

  mdVersionFiles.forEach((absolutePathToMdFile) => {
    execSync(`git add ${absolutePathToMdFile}`);
  });
  execSync('git add package.json');
  execSync('git add CHANGELOG.md');
  execSync("git commit -m 'RELEASING: Releasing 1 package");

  console.log('');
  logger.info("✅  PVM - All files have been updated and committed. You're ready to publish!");
  console.log('');
}

export { commitBumpChanges };

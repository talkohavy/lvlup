import { execSync } from 'node:child_process';
import fs from 'node:fs';
import { COLORS } from '../../../common/constants/colors.js';
import { logger } from '../../../lib/logger/logger.js';

type CommitBumpChangesProps = {
  mdVersionFilePaths: Array<string>;
  version: string;
};

export async function commitBumpChanges(props: CommitBumpChangesProps) {
  const { mdVersionFilePaths, version } = props;

  mdVersionFilePaths.forEach((mdVersionFileAbsolutePath) => {
    try {
      execSync(`git add -u ${mdVersionFileAbsolutePath}`); // <--- the -u flag states that only delete or modified files are committed. This helps avoid committing new (untracked) files.
    } catch (_error) {
      logger.warn(
        `WARNING! 'git add' operation failed. Detected an md version file which probably was not committed. Path to file was: ${COLORS.yellow}${mdVersionFileAbsolutePath}`,
      );
    }
  });
  execSync('git add package.json');

  const changelogFileName = fs.readdirSync('.').find((f) => f.toLowerCase() === 'changelog.md');

  if (changelogFileName) {
    execSync(`git add ${changelogFileName}`);
  }

  execSync('git commit -m "RELEASING: Releasing 1 package"');
  execSync(`git tag -a v${version} -m "Release version ${version}"`);
}

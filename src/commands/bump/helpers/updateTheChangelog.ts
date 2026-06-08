import fs from 'fs';
import os from 'os';
import path from 'path';
import { CHANGELOG_FILENAME, PROJECT_ROOT, type SemverLevelValues } from '@src/common/constants';
import { capitalize } from '@src/common/utils/capitalize';
import type { Changes } from '../types.js';

type UpdateTheChangelogProps = {
  packageName: string;
  nextVersion: string;
  changes: Changes;
};

export async function updateTheChangelog(props: UpdateTheChangelogProps) {
  const { packageName, nextVersion, changes } = props;

  const changelogFilenameLowercased = CHANGELOG_FILENAME.toLowerCase();
  const actualChangelogFileName = fs
    .readdirSync(PROJECT_ROOT)
    .find((f) => f.toLowerCase() === changelogFilenameLowercased);
  const changelogFullPath = path.resolve(PROJECT_ROOT, actualChangelogFileName ?? CHANGELOG_FILENAME);

  let changelogContent = `# ${packageName}`;

  let changesAsOneBigString = `## ${nextVersion}`;

  for (const key in changes) {
    if (!changes[key as SemverLevelValues].length) continue;

    changesAsOneBigString = `${changesAsOneBigString}${os.EOL}${os.EOL}### ${capitalize(key)} Changes${os.EOL}`;

    changes[key as SemverLevelValues].forEach((change) => {
      const descriptionAsMdBullet = change.description.replace(/\n/, '\n  ');

      changesAsOneBigString = `${changesAsOneBigString}${os.EOL}- ${descriptionAsMdBullet}`;
    });
  }

  if (actualChangelogFileName) {
    changelogContent = fs.readFileSync(changelogFullPath, 'utf-8');
  } else {
    // Add new line at the end of the file on its first creation
    changelogContent = `${changelogContent}${os.EOL}`;
  }

  // Insert the new entry before the existing content:
  const updatedChangelogContent = changelogContent.replace(
    `# ${packageName}`,
    `# ${packageName}${os.EOL}${os.EOL}${changesAsOneBigString}`,
  );

  // Write the updated content back to the changelog file
  fs.writeFileSync(changelogFullPath, updatedChangelogContent, 'utf-8');
}

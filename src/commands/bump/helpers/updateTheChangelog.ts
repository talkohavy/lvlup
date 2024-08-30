import fs from 'fs';
import os from 'os';
import path from 'path';
import { SemverLevels } from '../../../constants/enums.js';
import { CHANGELOG_FILENAME, PROJECT_ROOT } from '../../../constants/globals.js';
import { capitalize } from '../../../utils/capitalize.js';
import { Changes } from '../types.js';

type UpdateTheChangelogProps = {
  packageName: string;
  nextVersion: string;
  changes: Changes;
};

async function updateTheChangelog(props: UpdateTheChangelogProps) {
  const { packageName, nextVersion, changes } = props;

  const changelogFullPath = path.resolve(PROJECT_ROOT, CHANGELOG_FILENAME);

  let changelogContent = `# ${packageName}`;

  let changesAsOneBigString = `## ${nextVersion}`;

  for (const key in changes) {
    if (!changes[key as SemverLevels].length) continue;

    changesAsOneBigString = `${changesAsOneBigString}${os.EOL}${os.EOL}### ${capitalize(key)} Changes${os.EOL}`;

    changes[key as SemverLevels].forEach((change) => {
      const descriptionAsMdBullet = change.description.replace(/\n/, '\n  ');

      changesAsOneBigString = `${changesAsOneBigString}${os.EOL}- ${descriptionAsMdBullet}`;
    });
  }

  if (fs.existsSync(changelogFullPath)) {
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

  // Write the updated content back to the CHANGELOG.md file
  fs.writeFileSync(changelogFullPath, updatedChangelogContent, 'utf-8');
}

export { updateTheChangelog };

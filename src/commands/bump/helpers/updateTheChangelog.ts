import fs from 'fs';
import path from 'path';
import { CHANGELOG_FILENAME, PROJECT_ROOT } from '../../../constants/globals.js';
import { Changes } from '../types.js';

type deleteUsedMdFilesProps = {
  nextVersion: string;
  changes: Changes;
};

async function updateTheChangelog(props: deleteUsedMdFilesProps) {
  const { nextVersion, changes } = props;

  console.log('changes', changes);
  const semverLevel = 'minor';

  const changelogFullPath = path.resolve(PROJECT_ROOT, CHANGELOG_FILENAME);

  let changelogContent = '';

  // If the changelog exists, read its content
  if (fs.existsSync(changelogFullPath)) {
    changelogContent = fs.readFileSync(changelogFullPath, 'utf-8');
  }

  // Write code here...
  // Define the new entry to be added
  const newEntry = `## ${nextVersion}

### ${capitalize(semverLevel)} Changes

- ${(changes.major[0] as any).commitHash}: ${(changes.major[0] as any).description}
`;

  // Insert the new entry before the existing content
  const updatedChangelogContent = `# k8x

${newEntry}${changelogContent}`;

  // Write the updated content back to the CHANGELOG.md file
  fs.writeFileSync(changelogFullPath, updatedChangelogContent, 'utf-8');
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase + str.slice(1);
}

export { updateTheChangelog };

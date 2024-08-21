import fs, { PathOrFileDescriptor } from 'fs';
import matter from 'gray-matter';
import { SemverLevels } from '../../../constants/enums.js';
import { VersionObject } from '../../../constants/types.js';
import { trimNewLinesAndSpaces } from '../../../utils/trimNewLinesAndSpaces.js';
import { Changes } from '../types.js';

type CalculateNextVersionProps = {
  currentVersion: VersionObject;
  packageName: string;
  mdVersionFiles: Array<string>;
};

async function calculateNextVersion(props: CalculateNextVersionProps) {
  const { mdVersionFiles, packageName, currentVersion } = props;

  const changes: Changes = { major: [], minor: [], patch: [] };

  const nextVersionObj = { ...currentVersion };

  mdVersionFiles.forEach((absolutePath) => {
    const fileContent = fs.readFileSync(absolutePath as PathOrFileDescriptor, 'utf-8');
    const { data: frontmatter, content: description } = matter(fileContent);

    const trimmedDescription = trimNewLinesAndSpaces(description);

    if (!frontmatter?.[packageName]) return;

    const semverLevel = frontmatter[packageName];

    if (semverLevel === SemverLevels.Major) {
      return changes.major.push({ commitHash: 'abcd', description: trimmedDescription });
    }

    if (semverLevel === SemverLevels.Minor) {
      return changes.minor.push({ commitHash: 'abcd', description: trimmedDescription });
    }

    if (semverLevel === SemverLevels.Patch) {
      return changes.patch.push({ commitHash: 'abcd', description: trimmedDescription });
    }

    throw new Error(`Couldn't find semver level on file ${absolutePath}. File is corrupted...`);
  });

  if (changes.major.length) {
    nextVersionObj.major += 1;
  } else if (changes.minor.length) {
    nextVersionObj.minor += 1;
  } else {
    nextVersionObj.patch += 1;
  }

  return { changes, nextVersion: `${nextVersionObj.major}.${nextVersionObj.minor}.${nextVersionObj.patch}` };
}

export { calculateNextVersion };

import fs, { PathOrFileDescriptor } from 'fs';
import matter from 'gray-matter';
import { SemverLevels } from '../../../constants/enums.js';
import { trimNewLinesAndSpaces } from '../../../utils/trimNewLinesAndSpaces.js';
import { Changes } from '../types.js';

type ExtractChangesByPackageNameProps = {
  packageName: string;
  mdVersionFilePaths: Array<string>;
};

async function extractChangesByPackageName(props: ExtractChangesByPackageNameProps) {
  const { mdVersionFilePaths, packageName } = props;

  const changes: Changes = { major: [], minor: [], patch: [] };

  mdVersionFilePaths.forEach((versionFileAbsolutePath) => {
    const fileContent = fs.readFileSync(versionFileAbsolutePath as PathOrFileDescriptor, 'utf-8');
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

    throw new Error(`Couldn't find semver level on file ${versionFileAbsolutePath}. File is corrupted...`);
  });

  return changes;
}

export { extractChangesByPackageName };

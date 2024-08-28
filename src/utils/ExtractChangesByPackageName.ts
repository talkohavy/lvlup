import fs, { PathOrFileDescriptor } from 'fs';
import matter from 'gray-matter';
import { Changes } from '../commands/bump/types.js';
import { COLORS } from '../constants/colors.js';
import { SemverLevels } from '../constants/enums.js';
import { trimNewLinesAndSpaces } from './trimNewLinesAndSpaces.js';

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

    const filename = versionFileAbsolutePath.split('/').pop() as string;

    const trimmedDescription = trimNewLinesAndSpaces(description);

    if (!frontmatter?.[packageName]) return;

    const semverLevel = frontmatter[packageName];

    if (semverLevel === SemverLevels.Major) {
      return changes.major.push({ level: SemverLevels.Major, filename, description: trimmedDescription });
    }

    if (semverLevel === SemverLevels.Minor) {
      return changes.minor.push({ level: SemverLevels.Minor, filename, description: trimmedDescription });
    }

    if (semverLevel === SemverLevels.Patch) {
      return changes.patch.push({ level: SemverLevels.Patch, filename, description: trimmedDescription });
    }

    throw new Error(
      `Couldn't find semver level on file ${COLORS.red}${versionFileAbsolutePath}${COLORS.stop} related to ${packageName}. File is corrupted...`,
    );
  });

  return changes;
}

export { extractChangesByPackageName };

import fs, { PathOrFileDescriptor } from 'fs';
import matter from 'gray-matter';
import { SemverLevels } from '../../../constants/enums.js';
import { VersionObject } from '../../../constants/types.js';

type CalculateNextVersionProps = {
  currentVersion: VersionObject;
  currentPackageName: string;
  mdVersionFiles: Array<string>;
};

async function calculateNextVersion(props: CalculateNextVersionProps) {
  const { mdVersionFiles, currentPackageName, currentVersion } = props;

  const nextVersion = { ...currentVersion };
  const semverLevelWentUp = { major: false, minor: false, patch: false };

  mdVersionFiles.forEach((absolutePath) => {
    const fileContent = fs.readFileSync(absolutePath as PathOrFileDescriptor, 'utf-8');
    const { data: frontmatter } = matter(fileContent); // Extract frontmatter using gray-matter

    if (!frontmatter?.[currentPackageName]) return;

    const semverLevel = frontmatter[currentPackageName];

    if (semverLevel === SemverLevels.Major) return (semverLevelWentUp.major = true);
    if (semverLevel === SemverLevels.Minor) return (semverLevelWentUp.minor = true);
    if (semverLevel === SemverLevels.Patch) return (semverLevelWentUp.patch = true);

    throw new Error(`Couldn't find semver level on file ${absolutePath}. File is corrupted...`);
  });

  if (semverLevelWentUp.major) {
    nextVersion.major += 1;
  } else if (semverLevelWentUp.minor) {
    nextVersion.minor += 1;
  } else {
    nextVersion.patch += 1;
  }

  return `${nextVersion.major}.${nextVersion.minor}.${nextVersion.patch}`;
}

export { calculateNextVersion };

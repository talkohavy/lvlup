import { Separator, select } from '@inquirer/prompts';
import { SemverLevels } from '../../../constants/enums.js';

type inquireSemverProps = {
  packageName: string;
  currentVersion: string;
};

async function inquireSemver(props: inquireSemverProps) {
  const { packageName, currentVersion } = props;

  const semverLevel = await select({
    message: `✨ What kind of change is this for ${packageName}? (current version is ${currentVersion})`,
    choices: [
      new Separator(),
      {
        name: SemverLevels.Patch,
        value: SemverLevels.Patch,
        description: 'For bug fixes and patches',
        disabled: false,
      },
      {
        name: SemverLevels.Minor,
        value: SemverLevels.Minor,
        description: 'For when adding a new feature or ability',
      },
      {
        name: SemverLevels.Major,
        value: SemverLevels.Major,
        description: 'For when there are breaking changes',
      },
      new Separator(),
    ],
  });

  return semverLevel;
}

export { inquireSemver };

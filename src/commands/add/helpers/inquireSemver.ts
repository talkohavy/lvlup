import { Separator, select } from '@inquirer/prompts';

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
        name: 'patch',
        value: 'patch',
        description: 'For bug fixes and patches',
        disabled: false,
      },
      {
        name: 'minor',
        value: 'minor',
        description: 'For when adding a new feature or ability',
      },
      {
        name: 'major',
        value: 'major',
        description: 'For when there are breaking changes',
      },
      new Separator(),
    ],
  });

  return semverLevel;
}

export { inquireSemver };

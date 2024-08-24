import os from 'os';
import { COLORS } from '../../../constants/colors.js';
import { SemverLevels } from '../../../constants/enums.js';

type inquireSemverProps = {
  packageName: string;
  semverLevel: SemverLevels;
};

async function displayChangesSummary(props: inquireSemverProps) {
  const { packageName, semverLevel } = props;

  console.log(`${os.EOL}=== Summary of changes ===${os.EOL}`);
  console.log(`${COLORS.green}${semverLevel}:${COLORS.stop}`, packageName, os.EOL);
}

export { displayChangesSummary };

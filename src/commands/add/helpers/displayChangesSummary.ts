import os from 'os';
import { COLORS } from '../../../common/constants/colors.js';
import { SemverLevels } from '../../../common/constants/enums.js';

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

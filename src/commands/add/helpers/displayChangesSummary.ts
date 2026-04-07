import os from 'os';
import type { SemverLevels } from '../../../common/constants/globals.js';
import { COLORS } from '../../../common/constants/colors.js';

type inquireSemverProps = {
  packageName: string;
  semverLevel: SemverLevels;
};

export async function displayChangesSummary(props: inquireSemverProps) {
  const { packageName, semverLevel } = props;

  console.log(`${os.EOL}=== Summary of changes ===${os.EOL}`);
  console.log(`${COLORS.green}${semverLevel}:${COLORS.stop}`, packageName, os.EOL);
}

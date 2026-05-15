import os from 'os';
import { COLORS, type SemverLevelValues } from '@src/common/constants';

type inquireSemverProps = {
  packageName: string;
  semverLevel: SemverLevelValues;
};

export async function displayChangesSummary(props: inquireSemverProps) {
  const { packageName, semverLevel } = props;

  console.log(`${os.EOL}=== Summary of changes ===${os.EOL}`);
  console.log(`${COLORS.green}${semverLevel}:${COLORS.stop}`, packageName, os.EOL);
}

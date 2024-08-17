import { COLORS } from '../../../constants/colors.js';
import { SemverLevels } from '../../../constants/enums.js';

type inquireSemverProps = {
  packageName: string;
  semverLevel: SemverLevels;
};

async function displayChangesSummary(props: inquireSemverProps) {
  const { packageName, semverLevel } = props;

  console.log('\n=== Summary of changes ===', '\n');
  console.log(`${COLORS.green}${semverLevel}:${COLORS.stop}`, packageName, '\n');
}

export { displayChangesSummary };

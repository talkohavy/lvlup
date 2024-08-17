import { COLORS } from '../../../constants/colors.js';

type inquireSemverProps = {
  packageName: string;
  semverLevel: string;
};

async function displayChangesSummary(props: inquireSemverProps) {
  const { packageName, semverLevel } = props;

  console.log('\n=== Summary of changes ===', '\n');
  console.log(`${COLORS.green}${semverLevel}:${COLORS.stop}`, packageName, '\n');
}

export { displayChangesSummary };

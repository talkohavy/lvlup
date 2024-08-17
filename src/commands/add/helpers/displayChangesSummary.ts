type inquireSemverProps = {
  packageName: string;
  semverLevel: string;
};

async function displayChangesSummary(props: inquireSemverProps) {
  const { packageName, semverLevel } = props;

  console.log('\n=== Summary of changes ===', '\n');
  console.log(`[32m${semverLevel}[39m:`, packageName, '\n');
}

export { displayChangesSummary };

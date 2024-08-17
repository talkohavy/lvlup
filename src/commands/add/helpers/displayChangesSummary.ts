type inquireSemverProps = {
  packageName: string;
  selectedSemver: string;
};

async function displayChangesSummary(props: inquireSemverProps) {
  const { packageName, selectedSemver } = props;

  console.log('\n=== Summary of changes ===', '\n');
  console.log(`[32m${selectedSemver}[39m:`, packageName, '\n');
}

export { displayChangesSummary };

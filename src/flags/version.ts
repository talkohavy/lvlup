import { readPackageJson } from '../utils/readPackageJson.js';

async function showVersion() {
  const { version } = (await readPackageJson()).packageJsonAsObject;

  console.log(version);
}

export { showVersion };

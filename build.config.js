import { execSync } from 'child_process';
import fs, { cpSync } from 'fs';

/**
 * @typedef {{
 *   main: string,
 *   types: string,
 *   private?: string | boolean,
 *   scripts?: Record<string, string>,
 *   publishConfig: {
 *     access: string
 *   },
 * }} PackageJson
 */

const outDirName = 'dist';

buildPackageConfig();

async function buildPackageConfig() {
  cleanDistDirectory();

  buildWithTsc();

  copyReadmeFile();

  copyChangesetDirectory();

  copyNpmIgnore();

  copyAndManipulatePackageJsonFile();

  console.log('DONE !!!');
}

function cleanDistDirectory() {
  console.log('- Step 1: clear the dist directory');
  execSync('rm -rf dist');
}

function buildWithTsc() {
  console.log('- Step 2: build with vite');
  execSync('tsc -p ./tsconfig.build.json');
}

function copyReadmeFile() {
  console.log('- Step 3: copy the README.md file');
  const readStreamReadmeMd = fs.createReadStream('./README.md');
  const writeStreamReadmeMd = fs.createWriteStream(`./${outDirName}/README.md`);
  readStreamReadmeMd.pipe(writeStreamReadmeMd);
}

function copyAndManipulatePackageJsonFile() {
  console.log('- Step 4: copy & manipulate the package.json file');
  // Step 1: get the original package.json file
  /** @type {PackageJson} */
  const packageJson = JSON.parse(fs.readFileSync('./package.json').toString());

  // Step 2: Remove all scripts
  delete packageJson.scripts;
  console.log('-- deleted `scripts` key');

  // Step 3: Change from private to public
  delete packageJson.private;
  packageJson.publishConfig.access = 'public';
  console.log('-- changed from private to public');
  console.log('-- changed publishConfig access to public');

  // Step 4: remove 'outDirName/' from "main" & "types"
  packageJson.main = packageJson.main.replace(`${outDirName}/`, '');
  packageJson.types = packageJson.types.replace(`${outDirName}/`, '');

  // Step 5: create new package.json file in the output folder
  fs.writeFileSync(`./${outDirName}/package.json`, JSON.stringify(packageJson));
  console.log('-- package.json file written successfully!');
}

function copyChangesetDirectory() {
  console.log('- Step 5: copy the .changeset directory');
  cpSync('.changeset', `${outDirName}/.changeset`, { recursive: true });
}

function copyNpmIgnore() {
  console.log('- Step 6: copy the .npmignore file');
  cpSync('.npmignore', `${outDirName}/.npmignore`);
}
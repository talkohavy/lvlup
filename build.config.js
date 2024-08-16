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

  copyNpmIgnore();

  copyAndManipulatePackageJsonFile();

  console.log('\n[34mDONE !!![39m\n');
}

function cleanDistDirectory() {
  console.log('[32m- Step 1:[39m clear the dist directory');
  execSync('rm -rf dist');
}

function buildWithTsc() {
  console.log('[32m- Step 2:[39m build the output dir');
  execSync('tsc -p ./tsconfig.json');
}

function copyReadmeFile() {
  console.log('[32m- Step 3:[39m copy the README.md file');
  const readStreamReadmeMd = fs.createReadStream('./README.md');
  const writeStreamReadmeMd = fs.createWriteStream(`./${outDirName}/README.md`);
  readStreamReadmeMd.pipe(writeStreamReadmeMd);
}

function copyAndManipulatePackageJsonFile() {
  console.log('[32m- Step 4:[39m copy & manipulate the package.json file');
  // Step 1: get the original package.json file
  /** @type {PackageJson} */
  const packageJson = JSON.parse(fs.readFileSync('./package.json').toString());

  // Step 2: Remove all scripts
  delete packageJson.scripts;
  console.log('  • [34mdeleted[39m `scripts` key');

  // Step 3: Change from private to public
  delete packageJson.private;
  packageJson.publishConfig.access = 'public';
  console.log('  • [34mchanged[39m from private to public');
  console.log('  • [34mchanged[39m publishConfig access to public');

  // Step 4: remove 'outDirName/' from "main" & "types"
  packageJson.main = packageJson.main.replace(`${outDirName}/`, '');
  packageJson.types = packageJson.types.replace(`${outDirName}/`, '');

  // Step 5: create new package.json file in the output folder
  fs.writeFileSync(`./${outDirName}/package.json`, JSON.stringify(packageJson));
  console.log('  • [34mpackage.json[39m file written successfully!');
}

function copyNpmIgnore() {
  console.log('[32m- Step 5:[39m copy the .npmignore file');
  cpSync('.npmignore', `${outDirName}/.npmignore`);
}

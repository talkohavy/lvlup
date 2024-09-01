import { execSync } from 'child_process';
import fs, { cpSync } from 'fs';
import os from 'os';
import path from 'path';

/**
 * @typedef {{
 *   version: string,
 *   private?: string | boolean,
 *   main: string,
 *   types: string,
 *   scripts?: Record<string, string>,
 *   publishConfig: {
 *     access: string
 *   },
 * }} PackageJson
 */

const ROOT_PROJECT = process.cwd();

const outDirName = 'dist';

buildPackageConfig();

async function buildPackageConfig() {
  cleanDistDirectory();

  buildWithTsc();

  copyStaticFiles();

  updateVersionTemplates(); // <--- must come AFTER build!

  manipulatePackageJsonFile(); // <--- must come AFTER copy of static files

  console.log(`${os.EOL}[34mDONE !!![39m${os.EOL}`);
}

function cleanDistDirectory() {
  console.log('[32m- Step 1:[39m clear the dist directory');
  if (os.platform() === 'win32') {
    execSync('rd /s /q dist');
  } else {
    execSync('rm -rf dist');
  }
}

function buildWithTsc() {
  console.log('[32m- Step 2:[39m build the output dir');
  execSync('tsc -p ./tsconfig.json');
}

function manipulatePackageJsonFile() {
  console.log('[32m- Step 5:[39m copy & manipulate the package.json file');

  const packageJsonPath = path.resolve(ROOT_PROJECT, outDirName, 'package.json');

  // Step 1: get the original package.json file
  /** @type {PackageJson} */
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());

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
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson));
  console.log('  • [34mpackage.json[39m file written successfully!');
}

function copyStaticFiles() {
  console.log('[32m- Step 3:[39m copy static files');

  const filesToCopyArr = [
    { filename: 'package.json', sourceDirPath: [], destinationDirPath: [] },
    { filename: '.npmignore', sourceDirPath: [], destinationDirPath: [] },
    { filename: '.npmrc', sourceDirPath: [], destinationDirPath: [], isAllowedToFail: true },
    { filename: 'README.md', sourceDirPath: [], destinationDirPath: [] },
    {
      filename: 'default.README.md',
      sourceDirPath: ['src', 'commands', 'init'],
      destinationDirPath: [],
    },
    {
      filename: 'default.config.json',
      sourceDirPath: ['src', 'commands', 'init'],
      destinationDirPath: [],
    },
    { filename: 'schema.json', sourceDirPath: ['src', 'config'], destinationDirPath: [] },
  ];

  filesToCopyArr.forEach(({ filename, sourceDirPath, destinationDirPath, isAllowedToFail }) => {
    try {
      const sourceFileFullPath = path.resolve(ROOT_PROJECT, ...sourceDirPath, filename);
      const destinationFileFullPath = path.resolve(ROOT_PROJECT, outDirName, ...destinationDirPath, filename);

      cpSync(sourceFileFullPath, destinationFileFullPath);
      console.log(`    • ${filename}`);
    } catch (error) {
      console.error(error);
      if (isAllowedToFail) return;

      throw new Error('File MUST exists in order to PASS build process! cp operation failed...');
    }
  });
}

function updateVersionTemplates() {
  console.log('[32m- Step 4:[39m update version templates with version from package.json');

  /** @type {PackageJson} */
  const packageJson = JSON.parse(fs.readFileSync('./package.json').toString());
  const { version } = packageJson;

  const showVersionFuncPath = path.resolve(process.cwd(), 'dist', 'flags', 'version.js');
  const showVersionFuncContent = fs.readFileSync(showVersionFuncPath, 'utf-8');
  const updatedShowVersionFuncContent = showVersionFuncContent.replace('{{version}}', version);
  fs.writeFileSync(showVersionFuncPath, updatedShowVersionFuncContent);

  const defaultConfigJsonPath = path.resolve(process.cwd(), 'dist', 'default.config.json');
  const defaultConfigJsonContent = fs.readFileSync(defaultConfigJsonPath, 'utf-8');
  const updatedDefaultConfigJsonContent = defaultConfigJsonContent.replace('{{version}}', version);
  fs.writeFileSync(defaultConfigJsonPath, updatedDefaultConfigJsonContent);
}

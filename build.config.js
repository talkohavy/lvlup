import { execSync } from 'child_process';
import fs, { cpSync } from 'fs';
import os from 'os';
import path from 'path';
import * as esbuild from 'esbuild';

/**
 * @typedef {{
 *   version: string,
 *   private?: string | boolean,
 *   main: string,
 *   type: 'module' | 'commonjs'
 *   types: string,
 *   scripts?: Record<string, string>,
 *   publishConfig: {
 *     access: string
 *   },
 *   devDependencies?: Record<string, string>,
 * }} PackageJson
 */

const ROOT_PROJECT = process.cwd();
const mode = process.env.NODE_ENV;
const isProd = mode === 'production';
const greenColor = '[32m';
const blueColor = '[34m';
const stopColor = '[39m';

const outDirName = 'dist';

buildPackageConfig();

async function buildPackageConfig() {
  cleanDistDirectory();

  await build();

  copyStaticFiles();

  updateVersionTemplates(); // <--- must come AFTER build!

  manipulatePackageJsonFile(); // <--- must come AFTER copy of static files

  console.log(`${os.EOL}${blueColor}DONE !!!${stopColor}${os.EOL}`);
}

function cleanDistDirectory() {
  console.log(`${greenColor}- Step 1:${stopColor} clear the dist directory`);
  if (os.platform() === 'win32') {
    execSync('rd /s /q dist');
  } else {
    execSync('rm -rf dist');
  }
}

async function build() {
  console.log(`${greenColor}- Step 2:${stopColor} build the output dir`);

  if (isProd) {
    await esbuild.build({
      entryPoints: ['src/index.ts'],
      bundle: true,
      outfile: 'dist/index.js',
      sourcemap: false, // <--- defaults to `false`. for 'node', create sourcemaps is for development only.
      minify: true, // <--- defaults to `false`. should be `true` only in production.
      platform: 'node', // <--- defaults to 'browser'. If you're creating a CLI tool, use 'node' value. Setting platform to 'node' is beneficial when for example, all packages that are built-in to node such as fs are automatically marked as external so esbuild doesn't try to bundle them.
      format: 'esm', // <--- When platform is set to 'node', this defaults to 'cjs'.
      tsconfig: 'tsconfig.json', // <--- Normally the build API automatically discovers tsconfig.json files and reads their contents during a build. However, you can also configure a custom tsconfig.json file to use instead. This can be useful if you need to do multiple builds of the same code with different settings.
      treeShaking: true, // <--- defaults to `true`. Removes dead code.
      mainFields: ['main', 'module'], // <--- When platform is set to 'node', this defaults to 'module','main'. When platform is set to 'browser', this defaults to 'browser','module','main'. IMPORTANT! The order matters! 'main', 'module' is not the same as 'module', 'main'! I chose the more risky one, that attempts to tree-shake, but could potentially fail.
      packages: 'external', // <--- You also may not want to bundle your dependencies with esbuild. There are many node-specific features that esbuild doesn't support while bundling such as __dirname, import.meta.url, fs.readFileSync, and *.node native binary modules. You can exclude all of your dependencies from the bundle by setting packages to external. If you do this, your dependencies must still be present on the file system at run-time since they are no longer included in the bundle.
      conditions: [], // <--- If no custom conditions are configured, the Webpack-specific module condition is also included. The module condition is used by package authors to provide a tree-shakable ESM alternative to a CommonJS file without creating a dual package hazard. You can prevent the module condition from being included by explicitly configuring some custom conditions (even an empty list).
      /**
       * Some npm packages you want to use may not be designed to be run in the browser.
       * Sometimes you can use esbuild's configuration options to work around certain issues and successfully
       * bundle the package anyway. Undefined globals can be replaced with either the define feature in
       * simple cases or the inject feature in more complex cases.
       */
      // define :
      // inject :
    });
  } else {
    execSync('tsc -p ./tsconfig.json');
  }
}

function copyStaticFiles() {
  console.log(`${greenColor}- Step 3:${stopColor} copy static files`);

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
  console.log(`${greenColor}- Step 4:${stopColor} update version templates with version from package.json`);

  /** @type {PackageJson} */
  const packageJson = JSON.parse(fs.readFileSync('./package.json').toString());
  const { version } = packageJson;

  const showVersionFuncPath = isProd
    ? path.resolve(process.cwd(), 'dist', 'index.js')
    : path.resolve(process.cwd(), 'dist', 'common', 'utils', 'showVersion.js');
  const showVersionFuncContent = fs.readFileSync(showVersionFuncPath, 'utf-8');
  const updatedShowVersionFuncContent = showVersionFuncContent.replace('{{version}}', version);
  fs.writeFileSync(showVersionFuncPath, updatedShowVersionFuncContent);

  const defaultConfigJsonPath = path.resolve(process.cwd(), 'dist', 'default.config.json');
  const defaultConfigJsonContent = fs.readFileSync(defaultConfigJsonPath, 'utf-8');
  const updatedDefaultConfigJsonContent = defaultConfigJsonContent.replace('{{version}}', version);
  fs.writeFileSync(defaultConfigJsonPath, updatedDefaultConfigJsonContent);
}

function manipulatePackageJsonFile() {
  console.log(`${greenColor}- Step 5:${stopColor} copy & manipulate the package.json file`);

  const packageJsonPath = path.resolve(ROOT_PROJECT, outDirName, 'package.json');

  // Step: get the original package.json file
  /** @type {PackageJson} */
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());

  delete packageJson.private;
  delete packageJson.scripts;
  delete packageJson.devDependencies;
  packageJson.publishConfig.access = 'public';
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson));

  console.log(`  • ${blueColor}changed${stopColor} from private to public`);
  console.log(`  • ${blueColor}deleted${stopColor} "scripts" key`);
  console.log(`  • ${blueColor}deleted${stopColor} "devDependencies" key`);
  console.log(`  • ${blueColor}changed${stopColor} publishConfig access to public`);
  console.log(`  • ${blueColor}package.json${stopColor} file written successfully!`);
}

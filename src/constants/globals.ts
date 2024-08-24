import path from 'path';
import { readPackageJson } from '../utils/readPackageJson.js';
import { COLORS } from './colors.js';

const LVLUP_TOOL_NAME = 'lvlup';

const LVLUP_TOOL_NAME_COLORED = `${COLORS.green}lvlup${COLORS.stop}`;

const LVLUP_DIR_NAME = `.${LVLUP_TOOL_NAME}`;

const CHANGELOG_FILENAME = 'CHANGELOG.md';

const PROJECT_ROOT = process.cwd();

const LVLUP_DIR_PATH = path.resolve(PROJECT_ROOT, LVLUP_DIR_NAME);

const { version: LVLUP_CURRENT_VERSION } = (await readPackageJson()).packageJsonAsObject;

export {
  CHANGELOG_FILENAME,
  LVLUP_CURRENT_VERSION,
  LVLUP_DIR_NAME,
  LVLUP_DIR_PATH,
  LVLUP_TOOL_NAME_COLORED,
  PROJECT_ROOT,
};

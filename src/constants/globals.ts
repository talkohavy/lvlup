import path from 'path';
import { COLORS } from './colors.js';

const LVLUP_TOOL_NAME = 'lvlup';

const LVLUP_TOOL_NAME_COLORED = `${COLORS.green}lvlup${COLORS.stop}`;

const LVLUP_DIR_NAME = `.${LVLUP_TOOL_NAME}`;

const CHANGELOG_FILENAME = 'CHANGELOG.md';

const PROJECT_ROOT = process.cwd();

const LVLUP_DIR_PATH = path.resolve(PROJECT_ROOT, LVLUP_DIR_NAME);

export { CHANGELOG_FILENAME, LVLUP_DIR_NAME, LVLUP_DIR_PATH, LVLUP_TOOL_NAME, LVLUP_TOOL_NAME_COLORED, PROJECT_ROOT };

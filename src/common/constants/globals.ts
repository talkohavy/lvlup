import path from 'path';
import { COLORS } from './colors.js';

export const CLI_TOOL_NAME = 'lvlup';

export const CLI_TOOL_NAME_COLORED = `${COLORS.green}${CLI_TOOL_NAME}${COLORS.stop}`;

export const CLI_TOOL_DIR_NAME = `.${CLI_TOOL_NAME}`;

export const CHANGELOG_FILENAME = 'CHANGELOG.md';

export const PROJECT_ROOT = process.cwd();

export const CLI_TOOL_DIR_PATH = path.resolve(PROJECT_ROOT, CLI_TOOL_DIR_NAME);

export enum SemverLevels {
  Patch = 'patch',
  Minor = 'minor',
  Major = 'major',
}

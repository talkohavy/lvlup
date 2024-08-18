import path from 'path';

const PVM_DIR_NAME = '.pvm';

const CHANGELOG_FILENAME = 'CHANGELOG.md';

const PROJECT_ROOT = process.cwd();

const PVM_BASE_PATH = path.resolve(PROJECT_ROOT, PVM_DIR_NAME);

export { CHANGELOG_FILENAME, PROJECT_ROOT, PVM_BASE_PATH, PVM_DIR_NAME };

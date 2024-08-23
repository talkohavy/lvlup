import { globSync } from 'fs';
import path from 'path';
import { LVLUP_BASE_PATH, LVLUP_DIR_NAME } from '../../../constants/globals.js';

function getAllMdVersionFiles() {
  const mdVersionFilePaths = globSync(`${LVLUP_DIR_NAME}/*.md`).map((file) => {
    const filenameWithExtension = file.replace(`${LVLUP_DIR_NAME}/`, '');
    const filenameFullPath = path.resolve(LVLUP_BASE_PATH, filenameWithExtension);
    return filenameFullPath;
  });

  return mdVersionFilePaths;
}

export { getAllMdVersionFiles };

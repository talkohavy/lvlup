import path from 'path';
import { glob } from 'glob';
import { LVLUP_BASE_PATH, LVLUP_DIR_NAME } from '../../../constants/globals.js';

async function getAllMdVersionFiles() {
  const mdVersionFilePathsRaw = await glob(`${LVLUP_DIR_NAME}/*.md`);

  const mdVersionFilePaths = mdVersionFilePathsRaw.map((file) => {
    const filenameWithExtension = file.replace(`${LVLUP_DIR_NAME}/`, '');
    const filenameFullPath = path.resolve(LVLUP_BASE_PATH, filenameWithExtension);
    return filenameFullPath;
  });

  return mdVersionFilePaths;
}

export { getAllMdVersionFiles };

import path from 'path';
import { glob } from 'glob';
import { LVLUP_DIR_NAME, LVLUP_DIR_PATH } from '../constants/globals.js';

async function getAllMdVersionFiles() {
  const mdVersionFilePathsRaw = await glob(`${LVLUP_DIR_NAME}/*.md`, {
    ignore: [`${LVLUP_DIR_NAME}/README.md`],
  });

  const mdVersionFilePaths = mdVersionFilePathsRaw.map((file) => {
    const filenameWithExtension = file.replace(path.join(LVLUP_DIR_NAME, path.sep), '');
    const filenameFullPath = path.resolve(LVLUP_DIR_PATH, filenameWithExtension);
    return filenameFullPath;
  });

  return mdVersionFilePaths;
}

export { getAllMdVersionFiles };

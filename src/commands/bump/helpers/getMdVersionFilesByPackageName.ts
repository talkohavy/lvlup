import { globSync } from 'fs';
import path from 'path';
import { PVM_BASE_PATH, PVM_DIR_NAME } from '../../../constants/globals.js';

function getAllMdVersionFiles() {
  const mdVersionFilePaths = globSync(`${PVM_DIR_NAME}/*.md`).map((file) => {
    const filenameWithExtension = file.replace(`${PVM_DIR_NAME}/`, '');
    const filenameFullPath = path.resolve(PVM_BASE_PATH, filenameWithExtension);
    return filenameFullPath;
  });

  return mdVersionFilePaths;
}

export { getAllMdVersionFiles };

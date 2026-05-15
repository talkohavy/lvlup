import path from 'path';
import { glob } from 'glob';
import { CLI_TOOL_DIR_NAME, CLI_TOOL_DIR_PATH } from '../constants';

export async function getAllMdVersionFiles() {
  const mdVersionFilePathsRaw = await glob(`${CLI_TOOL_DIR_NAME}/*.md`, {
    ignore: [`${CLI_TOOL_DIR_NAME}/README.md`],
  });

  const mdVersionFilePaths = mdVersionFilePathsRaw.map((file) => {
    const filenameWithExtension = file.replace(path.join(CLI_TOOL_DIR_NAME, path.sep), '');
    const filenameFullPath = path.resolve(CLI_TOOL_DIR_PATH, filenameWithExtension);
    return filenameFullPath;
  });

  return mdVersionFilePaths;
}

import { PathLike } from 'fs';
import fs from 'fs/promises';

type deleteUsedMdFilesProps = {
  mdVersionFiles: Array<string>;
};

async function deleteUsedMdFiles(props: deleteUsedMdFilesProps) {
  const { mdVersionFiles } = props;

  const promisesArr: Array<Promise<void>> = [];

  mdVersionFiles.forEach((absolutePath) => {
    const promise = fs.unlink(absolutePath as PathLike);
    promisesArr.push(promise);
  });

  await Promise.all(promisesArr);
}

export { deleteUsedMdFiles };

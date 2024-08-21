import fs from 'fs/promises';

type deleteUsedMdFilesProps = {
  mdVersionFilePaths: Array<string>;
};

async function deleteUsedMdFiles(props: deleteUsedMdFilesProps) {
  const { mdVersionFilePaths } = props;

  const promisesArr: Array<Promise<void>> = [];

  mdVersionFilePaths.forEach((mdVersionFileAbsolutePath) => {
    const promise = fs.unlink(mdVersionFileAbsolutePath);
    promisesArr.push(promise);
  });

  await Promise.all(promisesArr);
}

export { deleteUsedMdFiles };

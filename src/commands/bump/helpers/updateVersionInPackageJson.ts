import fs from 'fs/promises';
import path from 'path';
import { PROJECT_ROOT } from '../../../constants/globals.js';

type updateVersionInPackageJsonProps = {
  prevVersion: string;
  nextVersion: string;
  packageJsonAsString: string;
};

async function updateVersionInPackageJson(props: updateVersionInPackageJsonProps) {
  const { prevVersion, nextVersion, packageJsonAsString } = props;

  const updatedPackageJsonAsString = packageJsonAsString.replace(prevVersion, nextVersion);

  await fs.writeFile(path.resolve(PROJECT_ROOT, 'package.json'), updatedPackageJsonAsString);
}

export { updateVersionInPackageJson };

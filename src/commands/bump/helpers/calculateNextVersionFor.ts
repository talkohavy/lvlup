import { VersionObject } from '../../../constants/types.js';
import { Changes } from '../types.js';

type CalculateNextVersionByChangesProps = {
  changes: Changes;
  currentVersion: VersionObject;
};

/**
 * @description
 * NOTE! `changes` should ONLY include changes relevant to 1 single package.
 */
async function calculateNextVersionByChanges(props: CalculateNextVersionByChangesProps) {
  const { changes, currentVersion } = props;

  const nextVersionObj = { ...currentVersion };

  if (changes.major.length) {
    nextVersionObj.major += 1;
    nextVersionObj.minor = 0;
    nextVersionObj.patch = 0;
  } else if (changes.minor.length) {
    nextVersionObj.minor += 1;
    nextVersionObj.patch = 0;
  } else {
    nextVersionObj.patch += 1;
  }

  const nextVersion = `${nextVersionObj.major}.${nextVersionObj.minor}.${nextVersionObj.patch}`;

  return nextVersion;
}

export { calculateNextVersionByChanges };

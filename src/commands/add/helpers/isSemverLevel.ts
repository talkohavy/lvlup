import { SemverLevels, type SemverLevelValues } from '@src/common/constants';

export function isSemverLevel(value: string): value is SemverLevelValues {
  return (Object.values(SemverLevels) as Array<string>).includes(value);
}

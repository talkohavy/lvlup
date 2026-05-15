import type { SemverLevelValues } from '@src/common/constants';

type SingleChange = {
  filename: string;
  level: SemverLevelValues;
  description: string;
};

export type Changes = Record<SemverLevelValues, Array<SingleChange>>;

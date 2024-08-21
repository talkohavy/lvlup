import { SemverLevels } from '../../constants/enums.js';

type SingleChange = { description: string };

export type Changes = {
  [SemverLevels.Major]: Array<SingleChange>;
  [SemverLevels.Minor]: Array<SingleChange>;
  [SemverLevels.Patch]: Array<SingleChange>;
};

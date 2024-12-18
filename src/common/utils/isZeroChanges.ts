import { Changes } from '../../commands/bump/types.js';

export function isZeroChanges(changes: Changes) {
  return !changes.major.length && !changes.minor.length && !changes.patch.length;
}

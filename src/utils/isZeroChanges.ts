import { Changes } from '../commands/bump/types.js';

function isZeroChanges(changes: Changes) {
  return !changes.major.length && !changes.minor.length && !changes.patch.length;
}

export { isZeroChanges };

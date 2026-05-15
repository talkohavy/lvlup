export const SemverLevels = {
  Patch: 'patch',
  Minor: 'minor',
  Major: 'major',
} as const;

export type SemverLevelValues = (typeof SemverLevels)[keyof typeof SemverLevels];

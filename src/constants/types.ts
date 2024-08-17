export type PackageJson = {
  name: string;
  version: string;
  description?: string;
  type?: 'module' | 'commonjs';
  main?: string;
  types?: string;
};

export type VersionObject = {
  major: number;
  minor: number;
  patch: number;
};

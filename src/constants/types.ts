export type PackageJson = {
  name: string;
  version: string;
  description?: string;
  private?: boolean;
  main?: string;
  types?: string;
  type?: 'module' | 'commonjs';
  publishConfig: {
    registry: string;
    access: 'public' | 'restricted';
  };
};

export type VersionObject = {
  major: number;
  minor: number;
  patch: number;
};

export enum Commands {
  Init = 'init',
  Add = 'add',
  Status = 'status',
  Bump = 'bump',
  Publish = 'publish',
}

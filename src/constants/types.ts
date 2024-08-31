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

export type ConfigJson = {
  commit?: {
    afterAdd?: boolean;
    afterBump?: boolean;
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

export enum EditorTypes {
  Vim = 'vim',
  Vi = 'vi',
  Nano = 'nano',
  Code = 'code',
}

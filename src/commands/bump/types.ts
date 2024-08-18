type SingleChange = {
  commitHash: string;
  description: string;
};

export type Changes = {
  major: Array<SingleChange>;
  minor: Array<SingleChange>;
  patch: Array<SingleChange>;
};

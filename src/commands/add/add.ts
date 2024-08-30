import os from 'os';
import { COLORS } from '../../constants/colors.js';
import { SemverLevels } from '../../constants/enums.js';
import { EditorTypes } from '../../constants/types.js';
import { readPackageJson } from '../../utils/readPackageJson.js';
import { validateRootLvlupExists } from '../../utils/validateRootLvlupExists.js';
import { commitTheNewMdFile } from './helpers/commitTheNewMdFile.js';
import { createNewMdFile } from './helpers/createNewMdFile.js';
import { displayChangesSummary } from './helpers/displayChangesSummary.js';
import { inquireCommitMessage } from './helpers/inquireCommitMessage.js';
import { inquireConfirm } from './helpers/inquireConfirm.js';
import { inquireSemver } from './helpers/inquireSemver.js';

// If you're gonna use emojis, use one of these:
// 🎩👑🌺⭐️✨❄️🥗🏆🎗️🥇🚀💎💊🔑🎁🎀✏️🔍🔓🛑❌✅💯❌🟢🟡🟠🔴🔵

type AddProps = {
  skip: boolean;
  editor: EditorTypes;
};

async function add(props: AddProps) {
  try {
    const { skip: shouldSkipConfirmation, editor } = props;

    const { packageJsonAsObject } = await readPackageJson(); // <--- for `add` command, there's no need to run `validatePackageJsonVersion` after `readPackageJson`.
    const { version: currentVersion, name: packageName } = packageJsonAsObject;

    validateRootLvlupExists();

    const semverLevel = await inquireSemver({ packageName, currentVersion });
    const commitMessage = await inquireCommitMessage({ editor });

    displayChangesSummary({ packageName, semverLevel });

    const shouldMoveForward = shouldSkipConfirmation || (await inquireConfirm());

    if (!shouldMoveForward) return;

    executeAddByAnswers({ packageName, semverLevel, commitMessage });
  } catch (_error: any) {
    console.log(`${os.EOL}${COLORS.red}Bye.${os.EOL}`);
  }
}

type ExecuteAddProps = {
  packageName: string;
  semverLevel: SemverLevels;
  commitMessage: string;
};

async function executeAddByAnswers(props: ExecuteAddProps) {
  const { packageName, semverLevel, commitMessage } = props;

  const filenameWithExtension = await createNewMdFile({ packageName, semverLevel, commitMessage });
  await commitTheNewMdFile({ filenameWithExtension, commitMessage });
}

export { add };

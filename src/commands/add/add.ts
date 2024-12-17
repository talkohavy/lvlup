import { COLORS } from '../../common/constants/colors.js';
import { SemverLevels } from '../../common/constants/enums.js';
import { EditorTypes } from '../../common/constants/types.js';
import { logger } from '../../common/utils/logger/logger.js';
import { readConfigJson } from '../../common/utils/readConfigJson.js';
import { readPackageJson } from '../../common/utils/readPackageJson.js';
import { validateRootLvlupExists } from '../../common/utils/validateRootLvlupExists.js';
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
  const { skip: shouldSkipConfirmation, editor } = props;

  const { packageJsonAsObject } = await readPackageJson(); // <--- for `add` command, there's no need to run `validatePackageJsonVersion` after `readPackageJson`.
  const { version: currentVersion, name: packageName } = packageJsonAsObject;

  validateRootLvlupExists();

  const semverLevel = await inquireSemver({ packageName, currentVersion });
  const commitMessage = await inquireCommitMessage({ editor });

  if (!commitMessage) {
    logger.error('commit message cannot be empty... exiting...', { newLineBefore: true });
    throw new Error();
  }

  displayChangesSummary({ packageName, semverLevel });

  const shouldMoveForward = shouldSkipConfirmation || (await inquireConfirm());

  if (!shouldMoveForward) return;

  executeAddByAnswers({ packageName, semverLevel, commitMessage });
}

type ExecuteAddProps = {
  packageName: string;
  semverLevel: SemverLevels;
  commitMessage: string;
};

async function executeAddByAnswers(props: ExecuteAddProps) {
  const { packageName, semverLevel, commitMessage } = props;

  const { configJsonAsObject } = await readConfigJson();
  const { afterAdd: shouldCommitAfterAdd } = configJsonAsObject.commit ?? {};

  const filenameFullPath = await createNewMdFile({ packageName, semverLevel, commitMessage });

  if (shouldCommitAfterAdd) {
    await commitTheNewMdFile({ filenameFullPath, commitMessage });
    logger.info('✅  LVLUP added an experience file and committed it', { newLineBefore: true });
  } else {
    logger.info('✅  LVLUP added an experience file. Please go over it and then commit it', { newLineBefore: true });
  }

  logger.info('✅  If you want to modify the experience, or expand its summary, you can find it here:');
  logger.info(`✅  ${COLORS.yellow}${filenameFullPath}${COLORS.stop}`, { newLineAfter: true });
}

export { add };

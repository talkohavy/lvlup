#!/usr/bin / env node

import { execSync } from 'child_process';
import { COLORS } from '../../constants/colors.js';
import { PVM_BASE_PATH } from '../../constants/globals.js';
import { logger } from '../../utils/logger/logger.js';
import { validateRootPvmExists } from '../../utils/validateRootPvmExists.js';
import { createNewMdFile } from './helpers/createNewMdFile.js';
import { displayChangesSummary } from './helpers/displayChangesSummary.js';
import { inquireCommitMessage } from './helpers/inquireCommitMessage.js';
import { inquireConfirm } from './helpers/inquireConfirm.js';
import { inquireSemver } from './helpers/inquireSemver.js';

// If you're gonna use emojis, use one of these:
// 🎩👑🌺⭐️✨❄️🥗🏆🎗️🥇🚀💎💊🔑🎁🎀✏️🔍🔓🛑❌✅💯❌🟢🟡🟠🔴🔵

async function add() {
  try {
    console.clear();

    validateRootPvmExists();

    const currentVersion = '0.0.6';
    const packageName = 'pvm';

    const semverLevel = await inquireSemver({ packageName, currentVersion });
    const commitMessage = await inquireCommitMessage();

    displayChangesSummary({ packageName, semverLevel });

    const shouldMoveForward = await inquireConfirm();

    if (!shouldMoveForward) return;

    executeAdd({ packageName, semverLevel, commitMessage });
  } catch (_error: any) {
    console.log(`\n${COLORS.red}Bye.\n`);
  }
}

add();

type ExecuteAddProps = {
  packageName: string;
  semverLevel: string;
  commitMessage: string;
};

async function executeAdd(props: ExecuteAddProps) {
  const { packageName, semverLevel, commitMessage } = props;

  const filenameWithExtension = await createNewMdFile({ packageName, semverLevel, commitMessage });
  execSync(`git add ${PVM_BASE_PATH}/${filenameWithExtension}`);
  execSync(`git commit -m '${commitMessage}'`);

  console.log('');
  logger.info('✅  PVM changes added and committed');
  logger.info("✅  If you want to modify or expand on the change's summary, you can find it here");
  logger.info(`✅  ${PVM_BASE_PATH}/${filenameWithExtension}`);
  console.log('');
}

export { add };

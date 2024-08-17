#!/usr/bin / env node

import { COLORS } from '../../constants/colors.js';
import { validateRootPvmExists } from '../../utils/validateRootPvmExists.js';
import { commitTheNewMdFile } from './helpers/commitTheNewMdFile.js';
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
  await commitTheNewMdFile({ filenameWithExtension, commitMessage });
}

export { add };

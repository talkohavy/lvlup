#!/usr/bin / env node

import { execSync } from 'child_process';
import path from 'path';
import { humanId } from 'human-id';
import { COLORS } from '../../constants/colors.js';
import { validateRootPvmExists } from '../../utils/validateRootPvmExists.js';
import { displayChangesSummary } from './helpers/displayChangesSummary.js';
import { inquireCommitMessage } from './helpers/inquireCommitMessage.js';
import { inquireConfirm } from './helpers/inquireConfirm.js';
import { inquireSemver } from './helpers/inquireSemver.js';

const pvmBase = path.resolve(process.cwd(), '.pvm');

// If you're gonna use emojis, use one of these:
// 🎩👑🌺⭐️✨❄️🥗🏆🎗️🥇🚀💎💊🔑🎁🎀✏️🔍🔓🛑❌✅💯❌🟢🟡🟠🔴🔵

async function add() {
  try {
    console.clear();

    validateRootPvmExists();

    const currentVersion = '0.0.6';
    const packageName = 'pvm';

    const selectedSemver = await inquireSemver({ packageName, currentVersion });
    const commitMessage = await inquireCommitMessage();

    displayChangesSummary({ packageName, selectedSemver });

    const shouldMoveForward = await inquireConfirm();

    if (!shouldMoveForward) return;

    executeAdd({ commitMessage });
  } catch (_error: any) {
    console.log(`\n${COLORS.red}Bye.\n`);
  }
}

add();

type ExecuteAddProps = {
  commitMessage: string;
};

function executeAdd(props: ExecuteAddProps) {
  const { commitMessage } = props;

  const filename = humanId({ separator: '-', capitalize: false });
  const filenameWithExtension = `${filename}.md`;

  execSync(`touch ${pvmBase}/${filenameWithExtension}`);
  execSync(`git add ${pvmBase}/${filenameWithExtension}`);
  execSync(`git commit -m '${commitMessage}'`);

  console.log('✅  PVM changes added and committed');
  console.log("✅  If you want to modify or expand on the change's summary, you can find it here");
  console.log(`✅  info ${pvmBase}/${filenameWithExtension}`);

  console.log('commitMessage', commitMessage);
}

export { add };

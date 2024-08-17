#!/usr/bin / env node

import { execSync } from 'child_process';
import path from 'path';
import { humanId } from 'human-id';
import { Separator, confirm, input, select } from '@inquirer/prompts';
import { validateRootPvmExists } from './utils/validateRootPvmExists.js';

// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const pvmBase = path.resolve(process.cwd(), '.pvm');

// If you're gonna use emojis, use one of these:
// 🎩👑🌺⭐️✨❄️🥗🏆🎗️🥇🚀💎💊🔑🎁🎀✏️🔍🔓🛑❌✅💯❌🟢🟡🟠🔴🔵

async function add() {
  try {
    console.clear();

    validateRootPvmExists();

    const currentVersion = '0.0.6';
    const packageName = 'pvm';

    const selectedSemver = await select({
      message: `✨ What kind of change is this for ${packageName}? (current version is ${currentVersion})`,
      choices: [
        new Separator(),
        {
          name: 'patch',
          value: 'patch',
          description: 'For bug fixes and patches',
          disabled: false,
        },
        {
          name: 'minor',
          value: 'minor',
          description: 'For when adding a new feature or ability',
        },
        {
          name: 'major',
          value: 'major',
          description: 'For when there are breaking changes',
        },
        new Separator(),
      ],
    });

    console.log('\n  [34m•[39m Answer:', selectedSemver, '\n');

    console.log('[32m?[39m ✨  Please enter a summary for this change (this will be in the changelogs).');

    const commitMessage = await input({
      message: 'Summary >',
    });

    console.log('\n=== Summary of changes ===', '\n');
    console.log(`[32m${selectedSemver}[39m:`, packageName, '\n');

    const shouldMoveForward = await confirm({
      message: '✨ Is this your desired change?',
      default: true,
      theme: { style: { defaultAnswer: () => '[30m(Y/n) › [34mtrue[39m' } },
    });

    if (!shouldMoveForward) return;

    executeAdd({ commitMessage });

    // const shouldSubmit = await checkbox({
    //   message: '✨  Is this your desired changeset? (Y/n) › true',
    //   choices: [
    //     { name: 'npm', value: 'npm' },
    //     { name: 'yarn', value: 'yarn' },
    //     new Separator(),
    //     { name: 'pnpm', value: 'pnpm', disabled: true },
    //     {
    //       name: 'pnpm',
    //       value: 'pnpm',
    //       disabled: '(pnpm is not available)',
    //     },
    //   ],
    // });

    selectedSemver;
    commitMessage;
  } catch (_error: any) {
    console.log('\n[31mBye.[39m\n');
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
  execSync(`git add ${pvmBase}${filenameWithExtension}`);
  execSync(`git commit -m ${commitMessage}`);

  console.log('✅  PVM changes added and committed');
  console.log("✅  If you want to modify or expand on the change's summary, you can find it here");
  console.log(`✅  info ${pvmBase}/${filenameWithExtension}`);

  console.log('commitMessage', commitMessage);
}

export { add };

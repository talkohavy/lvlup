import { COLORS, type SemverLevelValues } from '@src/common/constants';
import { EditorTypes } from '@src/common/types';
import { readConfigJson } from '@src/common/utils/readConfigJson';
import { readPackageJson } from '@src/common/utils/readPackageJson';
import { validateGitHasChanges } from '@src/common/utils/validateGitHasChanges';
import { validateRootLvlupExists } from '@src/common/utils/validateRootLvlupExists';
import { logger } from '@src/lib/logger';
import { commitTheNewMdFile } from './helpers/commitTheNewMdFile';
import { createNewMdFile } from './helpers/createNewMdFile';
import { displayChangesSummary } from './helpers/displayChangesSummary';
import { inquireCommitMessage } from './helpers/inquireCommitMessage';
import { inquireConfirm } from './helpers/inquireConfirm';
import { inquireSemver } from './helpers/inquireSemver';
import { resolveMessageFromFile } from './helpers/resolveMessageFromFile';
import type { Argv } from 'yargs';

export const addCommandString = 'add [FLAGS]';
export const addCommandDescription = 'Add new change';

export function addCommandBuilder(yargs: Argv) {
  yargs
    .option('skip', {
      description: 'Adding the skip option will not prompt the confirmation step, and basically skip it.',
      type: 'boolean',
      default: false,
    })
    .example('lvlup add --skip', 'Would skip the confirmation step.');
  yargs
    .option('level', {
      alias: 'l',
      type: 'string',
      choices: ['major', 'minor', 'patch'] as const,
      description:
        'Semver bump type (major, minor, or patch). With --message or --message-file, runs with no prompts; otherwise you are prompted for any missing flag.',
    })
    .option('message', {
      alias: 'm',
      type: 'string',
      description:
        'Summary for the experience (CHANGELOG). Mutually exclusive with --message-file. With --level, runs with no prompts; otherwise you are prompted for any missing flag.',
    })
    .option('message-file', {
      alias: 'f',
      type: 'string',
      description:
        'Read the summary from a file. Mutually exclusive with --message. With --level, runs with no prompts; otherwise you are prompted for any missing flag.',
    })
    .conflicts('message', 'message-file')
    .example(
      'lvlup add --level minor --message "Add widget API"',
      'Fully non-interactive add (for scripts, CI, and automation).',
    )
    .example('lvlup add -l patch -m "Fix null handling"', 'Fully non-interactive add using short flags.')
    .example(
      'lvlup add --level minor --message-file ./release-notes.md',
      'Fully non-interactive add with summary from a file.',
    );
  yargs
    .option('editor', {
      type: 'string',
      choices: [EditorTypes.Vi, EditorTypes.Vim, EditorTypes.Nano, EditorTypes.Code] as Array<EditorTypes>,
      description: 'Choose the external editor for editing your message.',
    })
    .example(
      'lvlup add --editor code',
      'Would open up VsCode as editor when you hit enter on the insert message prompt.',
    );
}

// If you're gonna use emojis, use one of these:
// 🎩👑🌺⭐️✨❄️🥗🏆🎗️🥇🚀💎💊🔑🎁🎀✏️🔍🔓🛑❌✅💯❌🟢🟡🟠🔴🔵

type AddProps = {
  skip: boolean;
  editor: EditorTypes;
  level?: SemverLevelValues;
  message?: string;
  messageFile?: string;
};

export async function add(props: AddProps) {
  const { skip: shouldSkipConfirmation, editor, level, message, messageFile } = props;

  const { packageJsonAsObject } = await readPackageJson(); // <--- for `add` command, there's no need to run `validatePackageJsonVersion` after `readPackageJson`.
  const { version: currentVersion, name: packageName } = packageJsonAsObject;

  validateRootLvlupExists();

  const { configJsonAsObject } = await readConfigJson();
  const areGitChangesRequired = configJsonAsObject.add?.requireGitChanges ?? true;

  if (areGitChangesRequired) {
    validateGitHasChanges();
  }

  const semverLevel = level ?? (await inquireSemver({ packageName, currentVersion }));

  const commitMessage = message ?? resolveMessageFromFile(messageFile) ?? (await inquireCommitMessage({ editor }));

  if (!commitMessage) {
    logger.error('commit message cannot be empty... exiting...', { newLineBefore: true });
    throw new Error();
  }

  displayChangesSummary({ packageName, semverLevel });

  const isNonInteractive = Boolean(level && (message || messageFile));

  const shouldMoveForward = isNonInteractive || shouldSkipConfirmation || (await inquireConfirm());

  if (!shouldMoveForward) return;

  await executeAddByAnswers({ packageName, semverLevel, commitMessage });
}

type ExecuteAddProps = {
  packageName: string;
  semverLevel: SemverLevelValues;
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

import { input } from '@inquirer/prompts';

async function inquireCommitMessage() {
  console.log('[32m?[39m ✨  Please enter a summary for this change (this will be in the changelogs).');

  const commitMessage = await input({
    message: 'Summary >',
  });

  return commitMessage;
}

export { inquireCommitMessage };

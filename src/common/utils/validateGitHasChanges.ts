import { execSync } from 'node:child_process';
import { logger } from '@src/lib/logger';

export function validateGitHasChanges() {
  try {
    execSync('git rev-parse --is-inside-work-tree', { encoding: 'utf8', stdio: 'pipe' });
  } catch {
    logger.error('This project is not a git repository. The add command requires git to track your changes.');

    throw new Error('Not a git repository');
  }

  const changeLines = getGitChangeLines();

  if (changeLines.length === 0) {
    logger.error('No git changes found. Make and save changes to your code before running add.', {
      newLineBefore: true,
    });

    throw new Error('No git changes to commit');
  }
}

function getGitChangeLines(): string[] {
  const porcelain = execSync('git status --porcelain', { encoding: 'utf8' });

  return porcelain.split('\n').filter((line) => line.trim().length > 0);
}

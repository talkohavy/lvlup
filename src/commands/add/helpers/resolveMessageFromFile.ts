import fs from 'fs';
import { logger } from '@src/lib/logger';
import { cleanMessageForMarkdown } from './cleanMessageForMarkdown';

export function resolveMessageFromFile(messageFile?: string) {
  if (!messageFile) return;

  let rawMessage: string;

  try {
    rawMessage = fs.readFileSync(messageFile!, 'utf-8');
  } catch {
    logger.error(`Could not read --message-file: ${messageFile}`, { newLineBefore: true });

    throw new Error();
  }

  const commitMessage = cleanMessageForMarkdown(rawMessage);

  if (!commitMessage) {
    logger.error('Summary cannot be empty... exiting...', { newLineBefore: true });

    throw new Error();
  }

  return commitMessage;
}

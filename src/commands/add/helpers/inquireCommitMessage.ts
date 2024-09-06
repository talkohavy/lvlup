import os from 'os';
import { CreateFileError, ExternalEditor, LaunchEditorError, ReadFileError, RemoveFileError } from 'external-editor';
import { input } from '@inquirer/prompts';
import { COLORS } from '../../../constants/colors.js';
import { LVLUP_TOOL_NAME } from '../../../constants/globals.js';
import { EditorTypes } from '../../../constants/types.js';
import { logger } from '../../../utils/logger/logger.js';
import { cleanMessageForMarkdown } from './cleanMessageForMarkdown.js';
import { useVsCodeAsEditor } from './useVsCodeAsEditor.js';

const externalEditorTemplate = `${os.EOL}${os.EOL}# An empty message aborts the editor.${os.EOL}# Please enter a summary for your changes.`;

type InquireCommitMessageProps = {
  editor?: EditorTypes;
};

async function inquireCommitMessage(props?: InquireCommitMessageProps) {
  const { editor } = props ?? {};

  console.log(`${COLORS.green} ✨  Please enter a summary for this change (this will appear in the CHANGELOG).`);
  console.log(`${COLORS.black} ✨    (submit empty line to open external editor)`);

  const commitMessageFromTerminal = await input({ message: 'Summary >' });

  const commitMessageRaw = commitMessageFromTerminal || getMessageFromExternalEditor(editor);

  const commitMessage = cleanMessageForMarkdown(commitMessageRaw);

  return commitMessage;
}

function getMessageFromExternalEditor(editor: string = 'vim') {
  try {
    const externalEditor = new ExternalEditor(externalEditorTemplate, {
      postfix: '.md',
      prefix: `${LVLUP_TOOL_NAME}-`,
    });

    if (editor === EditorTypes.Code) useVsCodeAsEditor(externalEditor);

    const commitMessageFromExternalEditor = externalEditor.run();

    if (externalEditor.lastExitStatus !== 0) throw new Error('The editor exited with a non-zero code');

    try {
      externalEditor.cleanup();
    } catch (err) {
      if (err instanceof RemoveFileError) {
        logger.error('Failed to remove the temporary file');
      } else {
        throw err;
      }
    }

    return commitMessageFromExternalEditor;
  } catch (error: any) {
    if (error instanceof CreateFileError) {
      logger.error('Failed to create the temporary file');
    } else if (error instanceof ReadFileError) {
      logger.error('Failed to read the temporary file');
    } else if (error instanceof LaunchEditorError) {
      logger.error('Failed to launch your editor');
    }

    throw error;
  }
}

export { inquireCommitMessage };

import { EditorTypes } from '../../../constants/types.js';

function useVsCodeAsEditor(editor: any) {
  editor.editor.bin = EditorTypes.Code;
  editor.editor.args = editor.editor.args.concat(
    '--wait', // <--- IMPORTANT!!! without this vscode will open and exit immediately!
    '--no-sandbox',
    // Some notable flags that are available: '-n', 'tmp', '--verbose', '--log', 'debug', '--disable-extensions', '--in-process-gpu'
  );
}

export { useVsCodeAsEditor };

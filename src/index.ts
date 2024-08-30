#!/usr/bin/env node

import os from 'os';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';
import { commandMapper } from './commandMapper.js';
import { bigTextLvlUp } from './constants/bigTextLvlUp.js';
import { COLORS } from './constants/colors.js';
import { EditorTypes } from './constants/types.js';
import { showVersion } from './flags/version.js';

type ArgsV = {
  $0: any;
  _: Array<string>;
} & Record<string, string | number | boolean>;

const yargInstance = yargs(hideBin(process.argv))
  /**
   * @description
   * Set the name of your script ($0). Default is the base filename executed by node (process.argv[1] or process.argv[0] for built electron apps)
   *
   * The name will appear at to the of the hemp menu
   */
  .scriptName(`${COLORS.green}lvlup${COLORS.stop}`)
  /**
   * @description
   * I put version to `false`, because yargs do not support -v, only --version, and I would like to have both.
   *
   * Add an option (e.g. --version) that displays the version number (given by the version parameter) and exits the process. By default yargs enables version for the --version option.
   *
   * If no arguments are passed to version (.version()), yargs will parse the package.json of your module and use its version value.
   *
   * If the boolean argument false is provided, it will disable --version.
   */
  .version(false)
  /**
   * @description
   *
   * Define the commands exposed by your application.
   *
   * cmd should be a string representing the command or an array of strings representing the command and its aliases. Read more about command aliases in the subsection below.
   *
   * Use desc to provide a description for each command your application accepts (the values stored in argv._). Set desc to false to create a hidden command. Hidden commands don't show up in the help output and aren't available for completion.
   *
   * Optionally, you can provide a builder object to give hints about the options that your command accepts:
   */
  .command('init', 'To start using lvlup, you first need to run the init command.')
  .command('add [FLAGS]', 'Add new change', (yargs) => {
    yargs
      .option('skip', {
        description: 'Adding the skip option will not prompt the confirmation step, and basically skip it.',
        type: 'boolean',
        default: false,
      })
      .example('lvlup add --skip', 'Would skip the confirmation step.');
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
  })
  .command('status', "Show the status before bumping the package's version")
  .command('bump', "Uses all md version files added by the `add` command to calculate and bump the package's version")
  .command('publish', 'publishes the package to your designated registry using the rules you specified.')
  .options({
    // ---------
    // Option 1:
    // ---------
    v: {
      alias: 'version',
      type: 'boolean',
      description: 'Show lvlup version',
      default: false,
      global: false,
    },
    // ---------
    // Option 1:
    // ---------
    h: {
      alias: 'help',
      type: 'boolean',
      description: 'Show help manual',
    },
  })
  // .example([
  //   ['$0 --help', 'Show help Menu'],
  // ])
  .showHelpOnFail(false, 'Specify --help for available options') // default value is true.
  .strict() // <--- any unknown command, or unknown flag, will raise an error.
  .updateStrings({
    'Positionals:': `${COLORS.blue}Positionals:${COLORS.stop}`, // <--- I will never use these. only Options, which I alias as 'Flags'.
    'Commands:': `${COLORS.blue}Commands:${COLORS.stop}`,
    'Options:': `${COLORS.blue}Flags:${COLORS.stop}`,
    'Examples:': `${COLORS.blue}Examples:${COLORS.stop}`,
  })
  /**
   * Configure an (e.g. --help) and implicit command that displays the usage string and exits the process. By default yargs enables help on the --help option.
   *
   * If present, the description parameter customizes the description of the help option in the usage string.
   *
   * If the boolean argument false is provided, it will disable --help.
   *
   * Note that any multi-char aliases (e.g. help) used for the help option will also be used for the implicit command. If there are no multi-char aliases (e.g. h), then all single-char aliases will be used for the command.
   *
   * If invoked without parameters, .help() will use --help as the option and help as the implicit command to trigger help output.
   */
  .help(false); // <--- help('help') & help() result in the same behavior.

async function run() {
  const argv = yargInstance.parse();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { $0: cliToolName, _: commands, ...flags } = argv as ArgsV;

  if (flags.version) {
    await showVersion();
    process.exit(0);
  }

  if (flags.help || !commands.length) {
    const helpMenuAsText = await yargInstance.getHelp();
    const helpTextBig = `${bigTextLvlUp}${os.EOL}${os.EOL}${helpMenuAsText}`;
    console.log(helpTextBig);
    process.exit(0);
  }

  commandMapper({ commands, flags });
}

run();

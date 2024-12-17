import { add } from './commands/add/index.js';
import { bump } from './commands/bump/index.js';
import { init } from './commands/init/index.js';
import { publish } from './commands/publish/publish.js';
import { status } from './commands/status/status.js';
import { Commands } from './common/constants/types.js';

const COMMAND_MAPPER = {
  [Commands.Init]: init,
  [Commands.Add]: add,
  [Commands.Status]: status,
  [Commands.Bump]: bump,
  [Commands.Publish]: publish,
};

type commandMapperProps = {
  commands: Array<string>;
  flags: any;
};

export async function commandMapper(props: commandMapperProps) {
  try {
    const { commands, flags } = props;

    const [command] = commands as [Commands];

    await COMMAND_MAPPER[command](flags);
  } catch (_error: any) {
    _error;
  }
}

import { add } from './commands/add/index.js';
import { bump } from './commands/bump/index.js';
import { init } from './commands/init/index.js';
import { status } from './commands/status/status.js';
import { Commands } from './constants/types.js';

const COMMAND_MAPPER = {
  [Commands.Init]: init,
  [Commands.Add]: add,
  [Commands.Status]: status,
  [Commands.Bump]: bump,
  [Commands.Publish]: add,
};

type commandMapperProps = {
  commands: Array<string>;
  flags: Record<string, string | number | boolean>;
};

function commandMapper(props: commandMapperProps) {
  const { commands } = props;

  const [command] = commands as [Commands];

  COMMAND_MAPPER[command]();
}

export { commandMapper };

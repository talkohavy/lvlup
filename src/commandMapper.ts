import { add } from './commands/add/index.js';
import { bump } from './commands/bump/bump.js';
import { Commands } from './constants/types.js';

const COMMAND_MAPPER = {
  [Commands.Init]: add,
  [Commands.Add]: add,
  [Commands.Status]: add,
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

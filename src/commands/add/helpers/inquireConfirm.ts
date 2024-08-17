import { confirm } from '@inquirer/prompts';
import { COLORS } from '../../../constants/colors.js';

async function inquireConfirm() {
  const shouldMoveForward = await confirm({
    message: '✨ Is this your desired change?',
    default: true,
    theme: { style: { defaultAnswer: () => `${COLORS.black}(Y/n) › ${COLORS.blue}true` } },
  });

  return shouldMoveForward;
}

export { inquireConfirm };

import { COLORS } from '../../../constants/colors.js';

function printWordStatus() {
  console.log(`${COLORS.blue}    
      _        _             
  ___| |_ __ _| |_ _   _ ___ 
 / __| __/ _\` | __| | | / __|
 \\__ \\ || (_| | |_| |_| \\__ \\
 |___/\\__\\__,_|\\__|\\__,_|___/
${COLORS.stop}`);
}

export { printWordStatus };

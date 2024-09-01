import { Console } from 'console';
import os from 'os';
import { Transform } from 'stream';
import { COLORS } from '../../../constants/colors.js';
import { SemverLevels } from '../../../constants/enums.js';

function removeIndexColumn(tableAsString: string) {
  let tableWithoutIndexColumn = '';

  for (const row of tableAsString.split(/[\r\n]+/)) {
    let r = row.replace(/[^┬]*┬/, '┌');
    r = r.replace(/^├─*┼/, '├');
    r = r.replace(/│[^│]*/, '');
    r = r.replace(/^└─*┴/, '└');
    r = r.replace(/'/g, ' ');
    tableWithoutIndexColumn += `${r}\n`;
  }

  return tableWithoutIndexColumn;
}

function colorTableFrame(tableAsString: string) {
  return tableAsString
    .replace(/┌/g, `${COLORS.bright}${COLORS.blue}┌${COLORS.stop}`)
    .replace(/─/g, `${COLORS.bright}${COLORS.blue}─${COLORS.stop}`)
    .replace(/┬/g, `${COLORS.bright}${COLORS.blue}┬${COLORS.stop}`)
    .replace(/┐/g, `${COLORS.bright}${COLORS.blue}┐${COLORS.stop}`)
    .replace(/│/g, `${COLORS.bright}${COLORS.blue}│${COLORS.stop}`)
    .replace(/┤/g, `${COLORS.bright}${COLORS.blue}┤${COLORS.stop}`)
    .replace(/┘/g, `${COLORS.bright}${COLORS.blue}┘${COLORS.stop}`)
    .replace(/┴/g, `${COLORS.bright}${COLORS.blue}┴${COLORS.stop}`)
    .replace(/└/g, `${COLORS.bright}${COLORS.blue}└${COLORS.stop}`)
    .replace(/├/g, `${COLORS.bright}${COLORS.blue}├${COLORS.stop}`)
    .replace(/┼/g, `${COLORS.bright}${COLORS.blue}┼${COLORS.stop}`);
}

function colorTableTitles(tableAsString: string) {
  return tableAsString
    .replace('Filename', `${COLORS.bright}${COLORS.green}Filename${COLORS.stop}`)
    .replace('Level', `${COLORS.bright}${COLORS.green}Level${COLORS.stop}`)
    .replace('Description', `${COLORS.bright}${COLORS.green}Description${COLORS.stop}`);
}

function colorSemverLevels(tableAsString: string) {
  return tableAsString
    .replaceAll(`  ${SemverLevels.Major}  `, `  ${COLORS.cyan}${SemverLevels.Major}${COLORS.stop}  `)
    .replaceAll(`  ${SemverLevels.Minor}  `, `  ${COLORS.cyan}${SemverLevels.Minor}${COLORS.stop}  `)
    .replaceAll(`  ${SemverLevels.Patch}  `, `  ${COLORS.cyan}${SemverLevels.Patch}${COLORS.stop}  `);
}

function colorMdFilePaths(tableAsString: string) {
  return tableAsString.replace(/(\s\s+.+.md\s\s+)/g, `${COLORS.yellow}$1${COLORS.stop}`);
}

function printStatusTable(input: Array<Record<string, string>>) {
  const transform = new Transform({ transform: (chunk, _enc, cb) => void cb(null, chunk) });
  const logger = new Console({ stdout: transform });
  logger.table(input);
  const table = (transform.read() || '').toString();

  const tableWithoutIndexColumn = removeIndexColumn(table);
  const tableWithBlueFrame = colorTableFrame(tableWithoutIndexColumn);
  const tableWithGreenTitles = colorTableTitles(tableWithBlueFrame);
  const tableWithCyanSemverLevels = colorSemverLevels(tableWithGreenTitles);
  const tableWithYellowMdFilePaths = colorMdFilePaths(tableWithCyanSemverLevels);

  console.log(`${os.EOL}${tableWithYellowMdFilePaths}`);
}

export { printStatusTable };

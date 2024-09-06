import { Table } from 'console-table-printer';
import { COLORS } from '../../../constants/colors.js';

const tableFrameStyle = {
  headerTop: {
    left: `${COLORS.blue}┌${COLORS.stop}`,
    mid: `${COLORS.blue}┬${COLORS.stop}`,
    right: `${COLORS.blue}┐${COLORS.stop}`,
    other: `${COLORS.blue}─${COLORS.stop}`,
  },
  headerBottom: {
    left: `${COLORS.blue}├${COLORS.stop}`,
    mid: `${COLORS.blue}┼${COLORS.stop}`,
    right: `${COLORS.blue}┤${COLORS.stop}`,
    other: `${COLORS.blue}─${COLORS.stop}`,
  },
  tableBottom: {
    left: `${COLORS.blue}└${COLORS.stop}`,
    mid: `${COLORS.blue}┴${COLORS.stop}`,
    right: `${COLORS.blue}┘${COLORS.stop}`,
    other: `${COLORS.blue}─${COLORS.stop}`,
  },
  vertical: `${COLORS.blue}│${COLORS.stop}`,
};
tableFrameStyle;

function prettyPrintStatusTable(dataArrToPrint: Array<any>) {
  const table = new Table({
    // title: 'LvLup Experiences',
    rows: dataArrToPrint,
    columns: [
      { name: 'filename', alignment: 'left', color: 'yellow', title: `${COLORS.green}Filename${COLORS.stop}` },
      { name: 'level', alignment: 'center', color: 'cyan', title: `${COLORS.green}Level${COLORS.stop}` },
      {
        name: 'description',
        alignment: 'left',
        color: 'white',
        title: `${COLORS.green}Description${COLORS.stop}`,
        maxLen: 80,
      },
    ],
    // enabledColumns: ['Filename', 'Level', 'Description'],
    style: tableFrameStyle,
  });

  table.printTable();
}

export { prettyPrintStatusTable };

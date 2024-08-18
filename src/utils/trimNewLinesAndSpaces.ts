function trimNewLinesAndSpaces(str: string) {
  return str.replace(/^[\s\r\n]+|[\s\r\n]+$/g, '');
}

export { trimNewLinesAndSpaces };

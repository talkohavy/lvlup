function convertLFToCLRF(fileContents: string) {
  const correctedFileContents = fileContents.replace(/\n/g, '\r\n'); // <--- Convert LF to CRLF

  return correctedFileContents;
}

export { convertLFToCLRF };

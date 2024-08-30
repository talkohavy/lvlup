function cleanMessageForMarkdown(message: string): string {
  return message
    .replace(/^#.*\n?/gm, '')
    .replace(/\n+$/g, '')
    .replace(/\n\n+/, '\n')
    .trim();
}

export { cleanMessageForMarkdown };

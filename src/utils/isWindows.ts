import os from 'os';

function isWindows() {
  return os.platform() === 'win32';
}

export { isWindows };

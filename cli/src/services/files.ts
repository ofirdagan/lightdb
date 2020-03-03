import path from 'path';

export const getCWD = () => {
  return path.basename(process.cwd());
};

import fs from 'fs-extra';
import path from 'path';

export default () => {
  try {
    const dir = fs.readdirSync(path.join(global.dir, 'user', 'themes'));
    return dir.map((theme) => theme.split('.')[0]);
  } catch (error) {
    console.log(error);
    return [];
  }
};

import path from 'path';
import { cwd } from 'process';
import { loadAPIReferenceHtmlStrings } from '../utils/loadAPIReferenceHtmlStrings';

export default {
  async load() {
    try {
      const docsDir = cwd();
      const [zip] = await Promise.all([loadAPIReferenceHtmlStrings(path.join(docsDir, '../src/array/zip.ts'))]);

      return {
        zip,
      };
    } catch (error) {
      console.error(error);
    }
  },
};

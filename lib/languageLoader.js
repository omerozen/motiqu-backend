// lib/languageLoader.js

import fs from 'fs';
import path from 'path';

export const getLanguageFile = (lang) => {
  const filePath = path.join(process.cwd(), 'data', `${lang}.json`);
  if (fs.existsSync(filePath)) {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  }
  return null;
};

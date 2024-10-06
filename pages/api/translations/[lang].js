// pages/api/translations/[lang].js

import validateApiKey from '../../../middleware/validateApiKey';
import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  try {
    // Validate the API key using the custom middleware
    validateApiKey(req, res, () => {});

    // Get the language code from the query
    const { lang } = req.query;

    // Resolve file path based on language
    const filePath = path.join(process.cwd(), 'data', `${lang}.json`);

    // Read the file and return the contents if it exists
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).send(fileContents);
    } else {
      return res.status(404).json({ error: 'Language file not found' });
    }
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

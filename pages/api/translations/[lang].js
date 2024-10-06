// pages/api/translations/[lang].js
import validateApiKey from '../../../middleware/validateApiKey'
import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  // Run the API key middleware
  await validateApiKey(req, res, () => {});

  const { lang } = req.query; // Get the language code from the query parameter
  const filePath = path.join(process.cwd(), 'data', `${lang}.json`); // Point to the correct JSON file

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(fileContents);
  } else {
    res.status(404).json({ error: 'Language file not found' });
  }
}

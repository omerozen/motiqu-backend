import path from 'path';
import fs from 'fs';

const langDataPath = path.join(process.cwd(), 'data');

export default async function handler(req, res) {
  const { lang } = req.query;

  // Secure the API using NEXT_PUBLIC_API_KEY
  const apiKey = req.headers['authorization'];
  const VALID_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  if (!apiKey || apiKey !== `Bearer ${VALID_API_KEY}`) {
    return res.status(401).json({ error: 'Unauthorized access - Invalid API Key' });
  }

  try {
    // Read and validate the requested language file
    const filePath = path.join(langDataPath, `${lang}.json`);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Language file not found' });
    }

    // Read the language JSON content
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const langData = JSON.parse(fileContent);

    res.status(200).json(langData);
  } catch (error) {
    console.error(`Error fetching language file for ${lang}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

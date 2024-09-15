// pages/api/translations/list.js (Backend)
import fs from 'fs/promises';
import path from 'path';

// API route to list available language packages
export default async function handler(req, res) {
  const dataPath = path.join(process.cwd(), 'data');

  if (req.method === 'GET') {
    try {
      // Read the contents of the 'data' folder
      const files = await fs.readdir(dataPath);

      // Extract the language codes from the filenames (e.g., 'EN.json' -> 'EN')
      const languages = files.map(file => path.parse(file).name);

      // Prepare a language list with labels (language names)
      const languageList = languages.map(code => ({
        code,
        name: code // Optionally, map codes to full language names
      }));

      res.status(200).json(languageList);
    } catch (error) {
      res.status(500).json({ message: 'Failed to load language list', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

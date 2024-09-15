// pages/api/translations/[lang].js (Backend)
import path from 'path';
import fs from 'fs/promises'; // Using promises with fs for async/await

// API route to serve language JSON files
export default async function handler(req, res) {
  // Extract language code from the request (e.g., 'EN', 'TR')
  const { lang } = req.query;

  // Path to the language file in the 'data' directory
  const languageFilePath = path.join(process.cwd(), 'data', `${lang}.json`);

  if (req.method === 'GET') {
    try {
      // Attempt to read the requested language file
      const languageData = await fs.readFile(languageFilePath, 'utf-8');
      // Respond with the file content as JSON
      res.status(200).json(JSON.parse(languageData));
    } catch (error) {
      // Handle the case where the file does not exist
      if (error.code === 'ENOENT') {
        res.status(404).json({ message: `Language package for ${lang} not found.` });
      } else {
        // Handle other potential errors
        res.status(500).json({ message: 'Failed to load language package', error: error.message });
      }
    }
  } else {
    // Respond with an error if the request method is not GET
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

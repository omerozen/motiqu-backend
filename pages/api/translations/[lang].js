import validateApiKey from '../../../middleware/validateApiKey';
import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  try {
    // Validate the API key
    validateApiKey(req, res, () => {});

    let { lang } = req.query;

    // Remove `.json` if present in the query parameter and normalize it
    lang = lang.replace('.json', '').trim().toLowerCase();
    console.log("Normalized Language Code:", lang);  // Log the normalized language code for debugging

    // Define the data directory path
    const dataDirectory = path.join(process.cwd(), 'data');

    // Read all files in the `data` directory
    const files = fs.readdirSync(dataDirectory);
    console.log("Files in data directory:", files);  // Log files in the directory for debugging

    // Use a case-insensitive search to find the correct file
    const matchedFile = files.find((file) => file.toLowerCase() === `${lang}.json`);
    console.log("Matched File:", matchedFile);  // Log the matched file for debugging

    // If the file is found, read and send its content
    if (matchedFile) {
      const filePath = path.join(dataDirectory, matchedFile);
      console.log("Final File Path:", filePath);  // Log the final file path for debugging
      const fileContents = fs.readFileSync(filePath, 'utf8');
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).send(fileContents);
    } else {
      console.error(`Language file not found for: ${lang}`);
      return res.status(404).json({ error: 'Language file not found' });
    }
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

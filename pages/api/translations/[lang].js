import validateApiKey from '../../../middleware/validateApiKey';
import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  try {
    // Validate the API key
    validateApiKey(req, res, () => {});

    // Get the language code from the query and remove the extra `.json` if present
    let { lang } = req.query;

    // Log the received `lang` parameter
    console.log("Received Language Code:", lang);

    // Remove `.json` if present in the query parameter
    lang = lang.replace('.json', '').trim();
    console.log("Sanitized Language Code:", lang);  // Log the language code to ensure it's correct

    // Construct file path with correct casing and file name
    const filePath = path.join(process.cwd(), 'data', `${lang}.json`);
    console.log("File Path being used:", filePath);  // Log the file path for debugging
    console.log(`Checking file at path: ${filePath}`);
    console.log(`Directory contents of /data:`, fs.readdirSync(path.join(process.cwd(), 'data')));


    // Check if file exists
    if (fs.existsSync(filePath)) {
      console.log(`Language file found for: ${lang}`);  // Log success message
      const fileContents = fs.readFileSync(filePath, 'utf8');
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).send(fileContents);
    } else {
      console.error(`Language file not found for: ${lang}`);  // Log error message if file not found
      return res.status(404).json({ error: 'Language file not found' });
    }
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

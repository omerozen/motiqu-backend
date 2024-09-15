// lib/languageLoader.js
import fs from 'fs';
import path from 'path';

// Define the path to the translations directory
const translationsDir = path.resolve(process.cwd(), 'data', 'translations');

// Function to load the language pack based on the requested language code
export const loadLanguagePack = async (lang) => {
  try {
    // Construct the path to the JSON file for the requested language
    const filePath = path.join(translationsDir, `${lang}.json`);

    // Read the file contents
    const fileContent = await fs.promises.readFile(filePath, 'utf8');

    // Parse the JSON data
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error loading language pack for ${lang}:`, error);
    throw new Error(`Language pack for ${lang} not found.`);
  }
};

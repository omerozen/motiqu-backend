// pages/api/langCodes.js

import validateApiKey from '../../middleware/validateApiKey';

export default function handler(req, res) {
  try {
    // Validate the API key
    validateApiKey(req, res, () => {});

    // Mock language codes data
    const langCodes = {
      en: "English",
      tr: "Türkçe",
      de: "Deutsch",
      fr: "Français",
    };

    // Respond with the language codes
    res.status(200).json(langCodes);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

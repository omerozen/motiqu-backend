// pages/api/languages.js
import initMiddleware from '../../lib/init-middleware';
import { apiKeyMiddleware } from '../../lib/api-key-middleware';

const apiKeyValidator = initMiddleware(apiKeyMiddleware);

// Mock data for available languages; this can be managed by a database or configuration file
const availableLanguages = {
  languages: [
    { code: 'EN', name: 'English' },
    { code: 'TR', name: 'Türkçe' },
    
    // Add more languages as needed
  ]
};

export default async function handler(req, res) {
  await apiKeyValidator(req, res);

  if (req.method === 'GET') {
    res.status(200).json(availableLanguages);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// pages/api/topics.js
import initMiddleware from '../../lib/init-middleware';
import { apiKeyMiddleware } from '../../lib/api-key-middleware';
import path from 'path';
import fs from 'fs/promises';

const apiKeyValidator = initMiddleware(apiKeyMiddleware);

export default async function handler(req, res) {
  await apiKeyValidator(req, res);

  if (req.method === 'GET') {
    const lang = req.query.lang || 'EN'; // Default to English if no language specified
    const filePath = path.join(process.cwd(), 'data/topics/topics.json');

    try {
      const data = await fs.readFile(filePath, 'utf8');
      const topics = JSON.parse(data);

      if (topics[lang]) {
        res.status(200).json(topics[lang]);
      } else {
        res.status(404).json({ error: 'Language not supported' });
      }
    } catch (error) {
      console.error('Error fetching topics:', error);
      res.status(500).json({ error: 'Failed to load topics' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

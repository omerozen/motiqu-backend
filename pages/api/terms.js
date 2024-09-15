// pages/api/terms.js
import initMiddleware from '../../lib/init-middleware';
import { apiKeyMiddleware } from '../../lib/api-key-middleware';
import termsData from '../../data/terms.json';
import Cors from 'cors';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'OPTIONS'],
    origin: '*',
  })
);

const apiKeyValidator = initMiddleware(apiKeyMiddleware);

export default async function handler(req, res) {
  await cors(req, res);
  await apiKeyValidator(req, res);

  const { lang } = req.query;

  if (req.method === 'GET') {
    try {
      const terms = termsData[lang] || termsData['EN'];
      res.status(200).json(terms);
    } catch (error) {
      res.status(500).json({ message: 'Failed to load terms content.' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

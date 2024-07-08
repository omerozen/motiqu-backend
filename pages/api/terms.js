// pages/api/terms.js
import initMiddleware from '../../lib/init-middleware';
import { apiKeyMiddleware } from '../../lib/api-key-middleware';
import terms from '../../data/terms.json';

const apiKeyValidator = initMiddleware(apiKeyMiddleware);

export default async function handler(req, res) {
  await apiKeyValidator(req, res);

  if (req.method === 'GET') {
    res.status(200).json(terms);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

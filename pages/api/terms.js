// pages/api/terms.js
import initMiddleware from '../../lib/init-middleware';
import { apiKeyMiddleware } from '../../lib/api-key-middleware';
import terms from '../../data/terms.json'; // Make sure this path and file exist

const apiKeyValidator = initMiddleware(apiKeyMiddleware);

export default async function handler(req, res) {
  try {
    await apiKeyValidator(req, res); // Ensure this middleware is working correctly

    if (req.method === 'GET') {
      res.status(200).json(terms);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error in /api/terms:', error); // Log error details
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

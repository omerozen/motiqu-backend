// pages/api/appversion.js
import validateApiKey from '../../lib/middleware/validateApiKey';

export default function handler(req, res) {
  validateApiKey(req, res, () => {
    if (req.method === 'GET') {
      res.status(200).json({ version: '1.0.0' }); // Replace with the latest app version
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}

import validateApiKey from '../../middleware/validateApiKey';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  validateApiKey(req, res, () => {
    if (req.method === 'GET') {
      const termsPath = path.resolve('./data/terms.json');
      const privacyPath = path.resolve('./data/privacy.json');

      const terms = JSON.parse(fs.readFileSync(termsPath, 'utf8'));
      const privacy = JSON.parse(fs.readFileSync(privacyPath, 'utf8'));

      res.status(200).json({ terms, privacy });
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}

// pages/api/translations/[lang].js
import initMiddleware from '../../../lib/init-middleware';
import { apiKeyMiddleware } from '../../../lib/api-key-middleware';
import Cors from 'cors';
import { loadLanguagePack } from '../../../lib/languageLoader'; // Assumed function to load language packs

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'OPTIONS'],
    origin: '*',
  })
);

export default async function handler(req, res) {
  await cors(req, res);
  await apiKeyMiddleware(req, res);

  const { lang } = req.query;

  try {
    const translations = await loadLanguagePack(lang);
    res.status(200).json(translations);
  } catch (error) {
    console.error(`Failed to load language pack: ${error}`);
    res.status(500).json({ message: 'Failed to load language pack.' });
  }
}

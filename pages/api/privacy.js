import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';
import privacy from '../../data/privacy.json';

const cors = initMiddleware(
  Cors({
    methods: ['GET'],
  })
);

export default async function handler(req, res) {
  await cors(req, res);
  res.status(200).json(privacy);
}

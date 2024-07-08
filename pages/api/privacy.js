import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'privacy.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const privacy = JSON.parse(fileContents);

  res.status(200).json(privacy);
}

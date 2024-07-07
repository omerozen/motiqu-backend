// pages/api/quoteoriginal.js
import axios from 'axios';

const validApiKey = process.env.NEXT_PUBLIC_API_KEY; // Access the API key from environment variables

export default async function handler(req, res) {
  const apiKey = req.headers.authorization?.split(' ')[1];

  if (apiKey !== validApiKey) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const openaiApiKey = process.env.OPENAI_API_KEY;

  if (req.method === 'POST') {
    const { topic, language } = req.body;

    try {
      const openaiResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo-0125',
          messages: [
            {
              role: 'system',
              content: 'Fetch a motivational quote.',
            },
            {
              role: 'user',
              content: `I need a motivation or inspiration about ${topic}, please bring me a proverb or a motivational quote from a poet, writer, thinker, philosopher, sociologist, psychologist, psychiatrist, opinion leader, leader, artist, athlete, actor/actress, politician, prophet, religious leader, important historical figure, or famous person, in its original language. Then translate it into ${language}.`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${openaiApiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const quote = openaiResponse.data.choices[0].message.content;
      res.status(200).json({ quote });
    } catch (error) {
      console.error('OpenAI API error:', error.response.data);
      res.status(500).json({
        message: 'Failed to fetch quote from OpenAI',
        details: error.response.data,
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

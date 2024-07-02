// pages/api/quote.js
import axios from 'axios';
import admin from '../../firebaseAdmin';

export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (req.method === 'POST') {
    const { token, topic, language } = req.body;

    try {
      // Verify App Check token
      await admin.appCheck().verifyToken(token);
      console.log('App Check token verified successfully.');

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
              content: `I need a motivation or inspiration about ${topic}, 
              please bring me a proverb or a motivation quote from a poet or a writer or a thinker 
              or a philosopher or a sociologist or a psychologist or a psychiatrist or an opinion leader 
              or a leader or an artist or a sporter or an actor/actress or a politician or a prophet 
              or a religious leader or an important character in the history or a famous person or etc. 
              in its original language. Then translate into ${language}`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const quote = openaiResponse.data.choices[0].message.content;
      res.status(200).json({ quote });
    } catch (error) {
      console.error('App Check token verification or OpenAI API error:', error);
      res.status(500).json({
        message: 'Failed to fetch quote or verify App Check token',
        details: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

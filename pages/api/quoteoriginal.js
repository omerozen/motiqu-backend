// pages/api/quoteoriginal.js
import axios from "axios";
import Cors from 'cors';

const cors = Cors({
  methods: ['POST', 'OPTIONS'],
  origin: '*',
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  const apiKey = process.env.OPENAI_API_KEY;
  const clientApiKey = req.headers.authorization?.split(' ')[1];

  if (clientApiKey !== process.env.NEXT_PUBLIC_API_KEY) {
    return res.status(403).json({ message: "Forbidden: Invalid API Key" });
  }

  if (req.method === "POST") {
    const { topic, language } = req.body;

    try {
      const openaiResponse = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo-0125",
          messages: [
            {
              role: "system",
              content: "Fetch a motivational quote.",
            },
            {
              role: "user",
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
            "Content-Type": "application/json",
          },
        }
      );

      const quote = openaiResponse.data.choices[0].message.content;
      res.status(200).json({ quote });
    } catch (error) {
      console.error("OpenAI API error:", error.response.data);
      res
        .status(500)
        .json({
          message: "Failed to fetch quote from OpenAI",
          details: error.response.data,
        });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

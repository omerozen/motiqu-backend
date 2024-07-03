// pages/api/quote.js
import axios from "axios";
import admin from "firebase-admin";

if (!admin.apps.length) {
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const appCheck = admin.appCheck();

export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (req.method === "POST") {
    const appCheckToken = req.headers['x-firebase-appcheck'];
    try {
      await appCheck.verifyToken(appCheckToken);

      const { topic, language } = req.body;

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
      console.error("OpenAI API error:", error.response ? error.response.data : error);
      res.status(500).json({
        message: "Failed to fetch quote from OpenAI",
        details: error.response ? error.response.data : error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

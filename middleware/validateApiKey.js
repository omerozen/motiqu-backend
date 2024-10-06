// lib/middleware/validateApiKey.js
  export const validateApiKey = async (req, res) => {
    const apiKey = req.headers['authorization'];
    const VALID_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  
    if (!apiKey || apiKey !== `Bearer ${VALID_API_KEY}`) {
      res.status(401).json({ error: 'Unauthorized access - Invalid API Key' });
      throw new Error('Unauthorized');
    }
  };
  
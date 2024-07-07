// middleware/validateApiKey.js
export default function validateApiKey(req, res, next) {
    const apiKey = req.headers.authorization?.split(' ')[1];
    
    if (!apiKey || apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    next();
  }
  
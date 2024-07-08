// lib/api-key-middleware.js
export const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['authorization'];
    if (!apiKey || apiKey !== `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
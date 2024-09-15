// middleware/api-key-middleware.js
export const apiKeyMiddleware = (req, res, next) => {
  const clientApiKey = req.headers.authorization?.split(' ')[1];
  if (clientApiKey !== process.env.NEXT_PUBLIC_API_KEY) {
    return res.status(403).json({ message: "Forbidden: Invalid API Key" });
  }
  next();
};

// CORS middleware
import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'],
  origin: '*', // Adjust based on your deployment needs
});

export default function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}
